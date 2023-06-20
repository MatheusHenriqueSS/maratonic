import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    console.log("chegou aqui");
    try {
        const { type } = (await req.json()) as {
            type: "google" | "github";
        };

        const session = await getServerSession(authOptions);

        if (session?.user?.email) {
            //if email isn't already in database
            console.log("has email");
            if (
                !(await prisma.user.count({
                    where: { email: session?.user?.email },
                }))
            ) {
                console.log("email não está na base de dados");
                const res = await fetch("http://localhost:3000/api/register", {
                    method: "POST",
                    body: JSON.stringify({
                        name: session.user.name,
                        email: session.user.email,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("res", res);

                if (!res.ok) {
                    throw new Error((await res.json()).message);
                }
            }
        } else {
            throw new Error(`Failed to log in with ${type}`);
        }
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
