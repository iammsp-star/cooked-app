import { NextResponse } from 'next/server';

const SPOTIFY_ROASTS = [
  "Oh look, another Taylor Swift fan trying to be edgy. Your Spotify Wrapped is a cry for help. You listen to 'lofi beats to study to' but we both know you haven't opened a book since 2019. Tragic.",
  "Your top artist is Drake? Really? Did you stop maturing musically in 8th grade? Your playlists have the emotional depth of a puddle in a parking lot.",
  "You're in the top 0.1% of listeners for an obscure indie band that sounds like two raccoons fighting in a dumpster. Congratulations on your elite, insufferable music taste."
];

const VALORANT_ROASTS = [
  "Hardstuck Silver for 4 Acts straight? Your KDA is lower than your credit score. You blame your teammates but we both know you're the one bottom fragging as Reyna.",
  "Ah, an Instalock Jett who doesn't enter site. Your aim is so bad even the training bots are laughing at you. Please uninstall, for the sake of the community.",
  "You have 1000 hours in this game and your crosshair placement still looks like you're looking for loose change on the ground. A literal potato could hold an angle better than you."
];

export async function POST(request: Request) {
  try {
    const { platform } = await request.json();

    // Simulate network delay for the "AI Inference"
    await new Promise(resolve => setTimeout(resolve, 3500));

    let roast = "";
    if (platform === "spotify") {
      roast = SPOTIFY_ROASTS[Math.floor(Math.random() * SPOTIFY_ROASTS.length)];
    } else if (platform === "valorant") {
      roast = VALORANT_ROASTS[Math.floor(Math.random() * VALORANT_ROASTS.length)];
    } else {
      roast = "I don't even know what to roast you for. You're just generally a disappointment.";
    }

    return NextResponse.json({ roast });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate roast" }, { status: 500 });
  }
}
