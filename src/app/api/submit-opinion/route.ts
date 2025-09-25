import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newOpinion = await prisma.opinion.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ success: true, data: newOpinion }, { status: 201 });
  } catch (error) {
    console.error('Error saving opinion:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
