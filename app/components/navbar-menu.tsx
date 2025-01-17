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
          <XMarkIcon className="w-8 h-8" />
        ) : (
          <Bars3Icon className="w-8 h-8" />
        )}
      </button>
      <div
        id="dropdown"
        className={`p-5 absolute z-10 t-2 r-1 translate-x-[-80%] ${
          isOpen ? "flex" : "hidden"
        } bg-white rounded-2xl border border-black flex-col gap-6`}
      >
        <ol className="flex flex-col gap-3">
          <li>
            <Link href="/o-nas">O nas</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/partnerstvo">Partnerstva</Link>
          </li>
        </ol>
        <Button>Dogodki</Button>
      </div>
    </div>
  );
}
