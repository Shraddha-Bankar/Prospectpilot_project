import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "meta-llama/llama-3.1-8b-instruct:free";

export async function POST(req: Request) {
  const { prompt, systemPrompt } = await req.json() as { prompt: string; systemPrompt?: string };

  // Fallback if no API key
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json({
      text: `[Demo Mode] Add your free OPENROUTER_API_KEY in Vercel environment variables to enable AI generation. Get one free at openrouter.ai`,
    });
  }

  try {
    const messages = [];
    if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
    messages.push({ role: "user", content: prompt });

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://prospectpilot.vercel.app",
        "X-Title": "ProspectPilot",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenRouter error ${res.status}: ${err}`);
    }

    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    const text = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message, text: "AI generation failed. Please try again." },
      { status: 500 }
    );
  }
}
