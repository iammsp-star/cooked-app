import OpenAI from "openai";
import { NextResponse } from 'next/server';

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, 
  baseURL: "https://api.groq.com/openai/v1", 
});

export async function POST(req: Request) {
  try {
    const { data, identity } = await req.json();

    const response = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile", 
      messages: [
        { 
          role: "system", 
          content: "You are a ruthless, cynical stand-up comedian. Use the user's specific metrics to completely dismantle their pride. Be extremely witty, harsh, and devastating, but short and punchy (max 3 sentences). Do not repeat phrases. Start directly with the roast. Do NOT say 'Here is your roast' or anything similar." 
        },
        { 
          role: "user", 
          content: `Target Identity: ${identity}. Data Payload: ${JSON.stringify(data)}` 
        }
      ],
      temperature: 0.92, 
      presence_penalty: 0.5
    });

    return NextResponse.json({ 
      roast: response.choices[0].message.content 
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Failed to generate roast" }, { status: 500 });
  }
}
