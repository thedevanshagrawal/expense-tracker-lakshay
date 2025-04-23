import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Transaction from '@/models/transaction';

export async function POST(request) {
  try {
    const { type, amount, description, category, user } = await request.json();
    console.log("user: ", user)
    await connectMongoDB();

    const res = await Transaction.create({
      type,
      amount,
      description,
      category,
      user
    });

    if (!res) {
      return NextResponse.json({ message: "error while creating transaction" }, { status: 400 });
    }

    return NextResponse.json({ message: "Transaction created" }, { status: 201 });
  } catch (error) {
    console.log("error: ", error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");

    if (!user) {
      return NextResponse.json({ error: "Missing user email" }, { status: 400 });
    }

    await connectMongoDB();
    const transactions = await Transaction.find({ user }).sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    console.log("error: ", error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");

    if (!user) {
      return NextResponse.json({ error: "Missing user email" }, { status: 400 });
    }

    await connectMongoDB();

    const response = await Transaction.deleteMany({ user })

    return NextResponse.json(response);
  } catch (error) {
    console.log("error: ", error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}