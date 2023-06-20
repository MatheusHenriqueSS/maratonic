import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function postRegister(
    name: string,
    email: string,
    passwordInput?: string
) {
    try {
        if (
            await prisma.user.count({
                where: {
                    email,
                },
            })
        )
            throwimport { prisma } from "@/lib/prisma";
            import { hash } from "bcryptjs";
            import { getServerSession } from "next-auth";
            import { getSession, signIn } from "next-auth/react";
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
             new Error("Email already in use");

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: passwordInput != null ? passwordInput : undefined,
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: err.message,
            }),
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { name, email, password } = (await req.json()) as {
            name: string;
            email: string;
            password: string;
        };
        const hashed_password = await hash(password, 12);

        if (
            await prisma.user.count({
                where: {
                    email,
                },
            })
        )
            throw new Error("Email already in use");
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashed_password,
            },
        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
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
