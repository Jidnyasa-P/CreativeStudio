# CreativeStudio

**Create Viral Memes and Professional Posters with AI-Powered Content Generation**

CreativeStudio is a modern, all-in-one platform for creating engaging visual content. Whether you want to generate hilarious memes or design professional posters, our AI-powered text generation engine creates ready-to-customize content in seconds—no design skills required.

---

## Features

### 🎭 Meme Creation
- **5+ Pre-designed Templates**: Drake Meme, Distracted Boyfriend, Loss Meme, and more
- **AI Caption Generator**: Generate funny, sarcastic, professional, or Gen-Z style captions
- **Full Text Customization**: Edit fonts, sizes, colors, positions, and text styling
- **Tone Selection**: Choose from 5 different tones (Funny, Sarcastic, Professional, Gen-Z, Formal)
- **Shareable Links**: Generate unique URLs to share your meme creations
- **Real-time Preview**: See changes instantly as you edit
- **PNG Export**: Download high-quality meme images

### 🎨 Poster Design
- **5 Beautiful Blank Templates**: Geometric, Nature, Gradient, Minimal, and Professional designs
- **AI Text Generation**: Generate complete poster content (Heading, Subheading, Body text)
- **Category-Based Content**: Choose from Event, Workshop, Promotion, Announcement, or General
- **Background Color Presets**: 8 professionally-designed color schemes + custom colors
- **Text Color Control**: Full control over heading and text colors
- **Full Text Editing**: Customize each section independently
- **Professional Export**: Download posters as high-quality PNG

### 🌙 User Experience
- **Dark Mode Toggle**: Switch between light and dark themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Canvas Rendering**: See your changes instantly
- **Intuitive Interface**: Clean, modern UI with minimal learning curve

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/creativestudio.git
   cd creativestudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Environment Variables (Optional)
For AI-powered caption generation via OpenAI:
```
OPENAI_API_KEY=your_api_key_here
```

The app works perfectly without an API key using fallback captions.

---

## How to Use

### Creating Memes
1. Click **"Create Memes"** on the homepage
2. Select a meme template
3. Customize text, colors, and positioning in the editor
4. Choose a tone (Funny, Sarcastic, Professional, etc.)
5. Click **"Generate Caption"** for AI suggestions
6. Click **"Download PNG"** to save your meme
7. Optional: Click **"Share"** to get a shareable link

### Designing Posters
1. Click **"Design Posters"** on the homepage
2. Select a poster template design
3. Choose a category for AI text generation (Event, Workshop, etc.)
4. Click **"Generate Text"** to get AI-generated content
5. Edit heading, subheading, and body text as needed
6. Select a background color from presets or choose custom
7. Click **"Download PNG"** to export your poster

---

## Technical Stack

- **Frontend**: Next.js 16 (React, TypeScript)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Components**: shadcn/ui component library
- **Canvas Rendering**: HTML5 Canvas API
- **AI Integration**: OpenAI API (optional)
- **Deployment**: Vercel

---

## Project Structure

```
creativestudio/
├── app/
│   ├── page.tsx                    # Homepage with mode selection
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles & theme
│   ├── create/                     # Meme creation
│   │   ├── page.tsx               # Meme creator wrapper
│   │   ├── client-page.tsx        # Meme editor (client component)
│   │   └── loading.tsx            # Loading boundary
│   ├── poster/                    # Poster creation
│   │   └── page.tsx               # Poster editor
│   └── api/
│       ├── generate-caption/      # Meme caption API
│       └── generate-poster-full/  # Poster text API
├── components/
│   ├── canvas-editor.tsx          # Meme canvas component
│   ├── text-panel.tsx             # Text editing panel
│   ├── tone-selector.tsx          # Tone selection UI
│   ├── poster-canvas.tsx          # Poster rendering
│   ├── templates-modal.tsx        # Template gallery modal
│   ├── share-modal.tsx            # Share functionality
│   └── ui/                        # shadcn/ui components
├── public/
│   └── templates/                 # Template images
│       ├── drake-meme.jpg
│       ├── distracted-boyfriend.jpg
│       ├── loss-meme.jpg
│       ├── poster-geometric.jpg
│       ├── poster-nature.jpg
│       ├── poster-gradient.jpg
│       ├── poster-minimal-frame.jpg
│       └── poster-double-frame.jpg
└── package.json
```

---

## API Endpoints

### Generate Meme Captions
**POST** `/api/generate-caption`
```json
{
  "template": "Drake Meme",
  "currentText": "existing text",
  "tone": "funny"
}
```
**Response**: `{ "caption": "generated caption text" }`

### Generate Poster Text
**POST** `/api/generate-poster-full`
```json
{
  "category": "event"
}
```
**Response**:
```json
{
  "text": {
    "heading": "ANNUAL TECH SUMMIT 2024",
    "subheading": "Innovation Meets Tomorrow",
    "body": "Join industry leaders for groundbreaking insights..."
  }
}
```

---

## Customization

### Adding New Meme Templates
1. Add template image to `/public/templates/`
2. Update `memeTemplates` array in `/app/create/client-page.tsx`
3. Add template-specific captions to `/app/api/generate-caption/route.ts`

### Adding New Poster Categories
1. Add new category to `categories` array in `/app/poster/page.tsx`
2. Add category captions to `/app/api/generate-poster-full/route.ts`
3. Update color presets if needed

### Changing Colors & Theme
Edit design tokens in `/app/globals.css`:
- `--primary`: Main brand color
- `--accent`: Highlight/accent color
- `--background`: Background color
- `--foreground`: Text color

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Set Environment Variables** (if using OpenAI)
   - Go to Project Settings → Environment Variables
   - Add `OPENAI_API_KEY`
   - Redeploy

### Deploy to Other Platforms

**Docker**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

**Heroku**, **Railway**, **Fly.io**, and other platforms also support Next.js apps.

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Tips

- **Meme Creation**: Rendered in real-time on canvas (no server processing)
- **Poster Creation**: Generated instantly client-side
- **API Calls**: Fallback captions ensure instant loading without API
- **Image Optimization**: Templates automatically optimized for web

---

## Troubleshooting

### AI Captions Not Generating
- Check if `OPENAI_API_KEY` is set
- Verify API key has sufficient credits
- Fallback captions will work without API key

### Canvas Not Rendering
- Clear browser cache
- Try a different browser
- Check browser console for errors

### Download Not Working
- Verify pop-ups aren't blocked
- Try a different browser
- Check available disk space

---

## Roadmap

- [ ] User accounts & saved creations
- [ ] Social sharing (Twitter, Instagram, Facebook)
- [ ] GIF creation for memes
- [ ] Batch content generation
- [ ] Advanced effects & filters
- [ ] Collaborative editing
- [ ] Analytics dashboard
- [ ] Premium templates library

---

## Contributing

We welcome contributions! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

- **Issues & Bugs**: Open a GitHub issue
- **Feature Requests**: Discuss in GitHub Discussions
- **Questions**: Check our FAQ or create a discussion

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by OpenAI API

---

**Created with ❤️ for creators, by creators**

CreativeStudio © 2024. All rights reserved.
