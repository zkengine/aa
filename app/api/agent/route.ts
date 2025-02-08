import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();

  const { NEXT_PUBLIC_AUTONOME_AGENT_URL, NEXT_PUBLIC_AUTONOME_AGENT_API_SECRET } = process.env;
  if (!NEXT_PUBLIC_AUTONOME_AGENT_URL || !NEXT_PUBLIC_AUTONOME_AGENT_API_SECRET) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  try {
    const response = await fetch(`${NEXT_PUBLIC_AUTONOME_AGENT_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: NEXT_PUBLIC_AUTONOME_AGENT_API_SECRET,
      },
      body: JSON.stringify({
        messages,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return new NextResponse(response.body);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
