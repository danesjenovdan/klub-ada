"use client";

import { useState } from "react";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { Button } from "./button";
import { useTranslations } from "next-intl";

export default function NewsletterComponent2() {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !consent) {
      setStatus(t("newsletter.status_missing_info"));
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
        setStatus(t("newsletter.status_success"));
        setEmail("");
        setConsent(false);
      } else {
        setStatus(data.error || t("newsletter.status_error"));
      }
    } catch (error) {
      setStatus(t("newsletter.status_error"));
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 border border-black rounded-2xl p-4 md:p-10 bg-pink100 max-w-[600px]">
      <div className="flex flex-col gap-4 text-ceneter">
        <Heading size="sm">{t("cta_newsletter")}</Heading>
        <Paragraph size="md">{t("newsletter.description")}</Paragraph>
      </div>
      <form onSubmit={handleSubscribe}>
        <div className="flex items-center">
          <input
            type="email"
            placeholder={t("newsletter.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 py-2 px-4 bg-white text-black border border-black rounded-lg"
          />
          <div className="m-1 mr-2">
            <Button type="submit">{t("newsletter.cta")}</Button>
          </div>
        </div>

        <div className="flex items-start mt-3">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(!consent)}
            className="w-4 h-4 border border-black rounded-lg cursor-pointer mt-1"
          />
          <label htmlFor="consent" className="text-md ml-2">
            {t("newsletter.consent")}
          </label>
        </div>
      </form>
      {status && <p className="text-black mt-3">{status}</p>}
    </div>
  );
}
