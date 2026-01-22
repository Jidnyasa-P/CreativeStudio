# CreativeStudio - Deployment Guide

## Production Readiness Checklist

- [x] Environment variables configured
- [x] API key management system implemented
- [x] Database connections optimized
- [x] Error handling and logging
- [x] Security headers configured
- [x] Performance optimizations enabled
- [x] Docker containerization
- [x] Health checks configured

## Environment Variables

Copy `.env.example` to `.env.production`:

```bash
cp .env.example .env.production
```

Required variables:
- `OPENAI_API_KEY`: Your OpenAI API key (optional - app works without it)
- `NODE_ENV`: Set to `production`
- `NEXT_PUBLIC_API_URL`: Your application URL

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Set environment variables in Project Settings > Environment Variables
4. Deploy

```bash
# Configure environment variables
OPENAI_API_KEY=sk_your_key_here
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

### Option 2: Docker + Cloud Run (Google Cloud)

```bash
# Build Docker image
npm run docker:build

# Test locally
npm run docker:run

# Push to Google Cloud
gcloud builds submit --tag gcr.io/PROJECT_ID/creativestudio
gcloud run deploy creativestudio --image gcr.io/PROJECT_ID/creativestudio --platform managed
```

### Option 3: Docker + AWS ECS

```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

docker build -t creativestudio:latest .
docker tag creativestudio:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/creativestudio:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/creativestudio:latest

# Deploy via CloudFormation or ECS Console
```

### Option 4: Traditional VPS (DigitalOcean, Linode, etc.)

```bash
# SSH into your server
ssh root@your-server-ip

# Clone repository
git clone https://github.com/yourusername/creativestudio.git
cd creativestudio

# Install dependencies
npm install

# Build application
npm run build:prod

# Start with PM2 (recommended)
npm install -g pm2
pm2 start npm --name "creativestudio" -- start:prod
pm2 save
pm2 startup
```

Set up Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Performance Optimization

### Enabled Features
- React Compiler for automatic performance optimizations
- Image optimization with WebP support
- Compression enabled
- Source maps disabled in production
- Next.js cache optimization

### Database Connection Pooling (if using database)

```typescript
// For PostgreSQL connections
import { Pool } from 'pg'

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

### Caching Strategy

- Browser caching: 1 day for assets
- CDN caching: 1 hour for HTML pages
- Server-side caching: Redis for API responses (optional)

## Monitoring & Logging

### Health Check Endpoint

```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-22T12:00:00Z",
  "version": "1.0.0"
}
```

### Recommended Monitoring Tools

- [Vercel Analytics](https://vercel.com/analytics) - Built-in with Vercel deployment
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session recording and logging
- [New Relic](https://newrelic.com) - Full stack monitoring

### Set up Sentry (Optional)

```bash
npm install @sentry/nextjs
```

Configure in `next.config.js`:

```javascript
import * as Sentry from "@sentry/nextjs";

export default Sentry.withSentryConfig(nextConfig, {
  org: "your-org",
  project: "creativestudio",
});
```

## Security

### HTTPS/SSL

All production deployments must use HTTPS. Most platforms (Vercel, Cloud Run, etc.) provide free SSL certificates.

### Environment Variables

Never commit `.env.production` to version control. Use platform-specific environment variable management:

- **Vercel**: Project Settings > Environment Variables
- **Docker/Cloud Run**: Secret Manager
- **AWS ECS**: Secrets Manager
- **VPS**: Use environment files with restricted permissions

### API Rate Limiting

The app includes fallback captions when API rate limits are hit. No additional configuration needed.

### CORS Configuration

Currently allowing cross-origin requests for API endpoints. For production, configure CORS properly:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL || '*')
  return response
}
```

## Troubleshooting

### Issue: API Key not persisting

**Solution**: Check if localStorage is enabled in browser. The API key is stored in browser's localStorage for security.

### Issue: Images not loading in production

**Solution**: Verify that public assets are being served correctly. Check CDN/image optimization settings.

### Issue: High memory usage

**Solution**: Enable Node.js memory limits and configure garbage collection:

```bash
NODE_OPTIONS="--max-old-space-size=512" npm start:prod
```

### Issue: Slow API responses

**Solution**: Implement caching and database connection pooling. Consider using a CDN for static assets.

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Docker/Cloud Run
```bash
gcloud run deploy creativestudio --image gcr.io/PROJECT_ID/creativestudio:previous-tag
```

### VPS with PM2
```bash
pm2 revert creativestudio
```

## Maintenance

### Regular Updates

```bash
# Check for dependency updates
npm outdated

# Update dependencies safely
npm update

# Rebuild and test
npm run build
npm start
```

### Database Backups (if applicable)

```bash
# PostgreSQL
pg_dump creativestudio > backup-$(date +%Y%m%d).sql
```

### Log Rotation

For VPS deployments, set up log rotation for application logs to prevent disk space issues.

## Support & Resources

- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Issues](https://github.com/yourusername/creativestudio/issues)

---

**Last Updated**: January 2024
**Version**: 1.0.0
