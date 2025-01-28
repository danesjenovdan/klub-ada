"use client";

import { useState } from "react";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { Button } from "./button";

export default function NewsletterComponent2() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !consent) {
      setStatus("Prosimo, vnesite e-naslov in potrdite soglasje.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, consent }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Hvala za prijavo 💗");
        setEmail("");
        setConsent(false);
      } else {
        setStatus(data.error || "Napaka pri prijavi.");
      }
    } catch (error) {
      setStatus("Napaka pri prijavi.");
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 border border-black rounded-2xl p-6 md:p-10 bg-pink100 max-w-[600px]">
      <div className="flex flex-col gap-4 text-ceneter">
        <Heading size="sm">Prijavi se na novičnik</Heading>
        <Paragraph size="md">
          {
            "S prijavo na naš novičnik boš prejela vabila na prihajajoče dogodke in povzetke dogodkov, uporabne nasvete, povezave do drugih koristnih virov, kot so hekatoni, karierni dogodki, zaposlitvene priložnosti in še več."
          }
        </Paragraph>
      </div>
      <form onSubmit={handleSubscribe}>
        <div className="flex items-center">
          <input
            type="email"
            placeholder="Vpiši svoj e-naslov"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 py-2 px-4 bg-white text-black border border-black rounded-lg"
          />
          <div className="m-1 mr-2">
            <Button type="submit">Prijavi se</Button>
          </div>
        </div>

        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(!consent)}
            className="w-4 h-4 border border-black rounded-lg cursor-pointer"
          />
          <label htmlFor="consent" className="text-md ml-2">
            Strinjam se, da mi Klub Ada po e-pošti pošilja novičnik in druga
            obvestila.
          </label>
        </div>
      </form>
      {status && <p className="text-black mt-3">{status}</p>}
    </div>
  );
}
