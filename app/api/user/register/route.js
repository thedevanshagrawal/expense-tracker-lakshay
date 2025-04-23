import connectMongoDB from '@/lib/mongodb';
import userModel from "@/models/userModel"
import { NextResponse } from "next/server"


export async function POST(req, res) {
    const { fullName, email, password } = await req.json()

    if (!fullName || !email || !password) {
        return NextResponse.json({ message: "all fields are required" }, { status: 400 })
    }

    try {
       await connectMongoDB();

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ message: "user already exist" }, { status: 409 })
        }
        const user = await userModel.create({
            fullName,
            email,
            password
        })

        if (!user) {
            return NextResponse.json({ message: "error while registring user" }, { status: 400 })
        }

        return NextResponse.json({ success: true, message: "Use registered successfully", user }, { status: 200 })
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }

}