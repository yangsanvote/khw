import { kv } from '@vercel/kv';

export async function GET() {
  try {
    const count = await kv.incr('visitor_count');
    return Response.json({ count });
  } catch (error) {
    console.error('KV error:', error);
    return Response.json({ count: 0 });
  }
} 