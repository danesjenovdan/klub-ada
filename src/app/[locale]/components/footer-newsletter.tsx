"use client";

import { use, useState } from "react";
import { Button } from "./button";
import { useTranslations } from "next-intl";

export default function FooterNewsletter() {
  const t = useTranslations("Footer.newsletter");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !consent) {
      setStatus(t("status_missing_info"));
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus(t("status_success"));
        setEmail("");
        setConsent(false);
      } else {
        setStatus(data.error || t("status_error"));
      }
    } catch (error) {
      setStatus(t("status_error"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubscribe}>
        <div className="flex items-center">
          <input
            type="email"
            placeholder={t("email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 py-2 px-4 bg-white text-black border border-black rounded-lg"
          />
          <div className="m-1 mr-2">
            <Button type="submit">{t("cta")}</Button>
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
            {t("consent")}
          </label>
        </div>
      </form>
      {status && <p className="text-red font-bold">{status}</p>}
    </div>
  );
}
