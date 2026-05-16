"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface AccountClaimFormProps {
  temporaryData: {
    roastText: string;
    data: any;
    identity: string;
  };
}

export default function AccountClaimForm({ temporaryData }: AccountClaimFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call to permanently anchor this profile
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Anchoring DTO Data:", temporaryData);
    setClaimed(true);
    setIsSubmitting(false);
  };

  if (claimed) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h3 className="text-[#ff4d4d] font-mono font-bold text-xl uppercase tracking-widest animate-pulse">
          [ SYSTEM ANCHORED ]
        </h3>
        <p className="text-gray-400 font-mono text-sm">
          Your shame is now permanent. Welcome to the Hellfire network.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <h3 className="text-[#ff4d4d] font-mono font-bold text-lg md:text-xl uppercase tracking-widest animate-pulse mb-4">
        [ SYSTEM WARNING: UNCLAIMED HISTORY ]
      </h3>
      <p className="text-gray-400 font-mono text-xs md:text-sm mb-6 leading-relaxed">
        Do you want to track your shame? Register your account now to permanently anchor this profile to the Hellfire system network and unlock historical metric trends.
      </p>

      <form onSubmit={handleClaim} className="flex flex-col space-y-4 font-mono">
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-zinc-800 text-white p-3 rounded-md focus:border-[#ff4d4d] focus:outline-none transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black border border-zinc-800 text-white p-3 rounded-md focus:border-[#ff4d4d] focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 p-3 bg-zinc-900 border border-[#ff4d4d]/30 text-[#ff4d4d] font-bold uppercase hover:bg-[#ff4d4d] hover:text-black transition-all rounded-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Anchoring...
            </>
          ) : (
            "Claim Account"
          )}
        </button>
      </form>
    </div>
  );
}
