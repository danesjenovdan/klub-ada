import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const MailerLiteApiKey = process.env.MAILERLITE_API;

    if (!MailerLiteApiKey) {
      throw new Error("Missing Mailerlite environment variable");
    }

    const customUrl = `https://connect.mailerlite.com/api/subscribers`;

    const response = await fetch(customUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MailerLiteApiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        // status: 'subscribed',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail },
        { status: response.status }
      );
    }

    const received = await response.json();
    return NextResponse.json(received);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
