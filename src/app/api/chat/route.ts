import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    const response = await axios.get('https://dummyjson.com/products/1');
    const data = response.data;

    return NextResponse.json({
      reply: `Product: ${data.title}\nDescription: ${data.description}`,
    });
  } catch (error) {
    return NextResponse.json({ reply: 'Error fetching data. Try again later.' }, { status: 500 });
  }
}
