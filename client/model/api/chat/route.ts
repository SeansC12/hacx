import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const sdpOffer = await req.text();

    // Send SDP offer to Azure OpenAI Realtime endpoint
    const azureResp = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}/openai/realtime?deployment=${process.env.AZURE_OPENAI_DEPLOYMENT}&api-version=${process.env.AZURE_OPENAI_API_VERSION}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.AZURE_OPENAI_API_KEY}`,
          "Content-Type": "application/sdp",
        },
        body: sdpOffer,
      }
    );

    const sdpAnswer = await azureResp.text();

    return new NextResponse(sdpAnswer, {
      headers: { "Content-Type": "application/sdp" },
    });
  } catch (err: any) {
    console.error("Realtime route error:", err);
    return NextResponse.json(
      { error: err.message || "Realtime connection failed" },
      { status: 500 }
    );
  }
}
