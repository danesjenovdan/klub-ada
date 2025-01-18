"use client";

import { Button } from "./button";
import { Link } from "./link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Button>Vsi dogodki</Button>
      </div>
    </div>
  );
}
