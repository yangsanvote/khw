import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://rapid-walleye-14466.upstash.io',
  token: 'ATiCAAIjcDFjZDVmZTEwZmYzZjM0Njk1YWM0MTM2YmM1MTE3Mzc2Y3AxMA'
})

export async function GET() {
  try {
    const count = await redis.incr('visitor_count');
    console.log('Current count:', count);
    return Response.json({ count });
  } catch (error) {
    console.error('Redis error:', error);
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      count: 0 
    });
  }
} 