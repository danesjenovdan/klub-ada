import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const loopsApiKey = process.env.LOOPS_API_KEY;

    if (!loopsApiKey) {
      throw new Error("Missing Loops environment variable");
    }

    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loopsApiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        subscribed: true,
      }),
    });

    const received = await response.json();

    if (!response.ok || received.success === false) {
      return NextResponse.json(
        { error: received.message || "Subscription failed" },
        { status: response.ok ? 400 : response.status }
      );
    }

    return NextResponse.json(received);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
