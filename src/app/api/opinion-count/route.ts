import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await prisma.opinion.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching opinion count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
