import { ReactNode } from "react";

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <section className="px-5 md:px-20 py-10 md:py-20 box-border max-w-full">
      {children}
    </section>
  );
}
