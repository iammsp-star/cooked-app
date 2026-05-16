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

const GITHUB_ROASTS = [
  "500 commits to main and zero tests? You're basically building a house of cards in a hurricane. I see more code on StackOverflow than in your actual brain.",
  "Your contribution graph looks like a barcode that scans as 'unemployable'. A single green square every two months doesn't make you a developer.",
  "Ah yes, the '10x engineer' who writes spaghetti code so tangled it could be served at an Italian restaurant. Your PRs are war crimes."
];

export async function POST(request: Request) {
  try {
    const { platform, accountId } = await request.json();

    // Simulate network delay for the Account Sync Engine & Data Extraction
    await new Promise(resolve => setTimeout(resolve, 2500));

    let roast = "";
    let syncedMetrics: string[] = [];
    let identity = accountId || "ANONYMOUS_USER";
    let metrics: any = {};

    if (platform === "spotify") {
      const selectedRoast = SPOTIFY_ROASTS[Math.floor(Math.random() * SPOTIFY_ROASTS.length)];
      roast = `Listen here ${identity}, ${selectedRoast.charAt(0).toLowerCase() + selectedRoast.slice(1)}`;
      syncedMetrics = [`Top Artist: Taylor Swift`, "Pop", "Indie Rock", "Overplayed: Cruel Summer"];
      metrics = { status: "tragic", vibe: "unbearable" };
    } else if (platform === "valorant") {
      const selectedRoast = VALORANT_ROASTS[Math.floor(Math.random() * VALORANT_ROASTS.length)];
      roast = `Listen here ${identity}, ${selectedRoast.charAt(0).toLowerCase() + selectedRoast.slice(1)}`;
      syncedMetrics = ["Silver 2", "Jett Instalock", "35% Win Rate", "0.8 KDA"];
      metrics = { status: "critical", damage: "low" };
    } else if (platform === "github") {
      const selectedRoast = GITHUB_ROASTS[Math.floor(Math.random() * GITHUB_ROASTS.length)];
      roast = `Listen here ${identity}, ${selectedRoast.charAt(0).toLowerCase() + selectedRoast.slice(1)}`;
      syncedMetrics = ["500 Commits to Main", "0 Tests Written", "StackOverflow Pro", "Spaghetti Code"];
      metrics = { status: "unemployable", quality: "garbage" };
    } else {
      roast = "I don't even know what to roast you for. You're just generally a disappointment.";
      syncedMetrics = ["Unknown", "Data Not Found"];
    }

    return NextResponse.json({ 
      roast,
      syncedMetrics,
      identity,
      metrics
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate roast" }, { status: 500 });
  }
}
