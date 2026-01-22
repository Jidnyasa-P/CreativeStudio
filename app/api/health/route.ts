import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV,
    }

    return NextResponse.json(healthData, { status: 200 })
  } catch (error) {
    console.error('[health] Health check failed:', error)
    return NextResponse.json(
      { status: 'error', message: 'Health check failed' },
      { status: 503 }
    )
  }
}
