"use client";

import { Link } from "./link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { LinkButton } from "./link-button";

export function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const onClick = () => {
      setIsOpen(false);
    };

    window.addEventListener("mouseup", onClick);

    return () => {
      window.removeEventListener("mouseup", onClick);
    };
  }, []);

  return (
    <div className="block md:hidden">
      <button
        data-dropdown-toggle="dropdown"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="w-7 h-7" />
        ) : (
          <Bars3Icon className="w-7 h-7" />
        )}
      </button>
      <div
        id="dropdown"
        className={`p-5 absolute z-10 t-2 r-1 translate-x-[-80%] ${
          isOpen ? "flex" : "hidden"
        } bg-white rounded-2xl border border-black flex-col gap-6`}
      >
        <ol className="flex flex-col gap-4">
          <li>
            <Link variant="secondary" href="/o-nas">
              O nas
            </Link>
          </li>
          <li>
            <Link variant="secondary" href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link variant="secondary" href="/partnerstvo">
              Partnerstva
            </Link>
          </li>
        </ol>
        <LinkButton href="/dogodki">Vsi dogodki</LinkButton>
      </div>
    </div>
  );
}
