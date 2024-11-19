// src/app/api/test/route.js
export async function GET() {
  return new Response('Test API is working!', { status: 200 });
}
