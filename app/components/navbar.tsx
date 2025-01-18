import Image from "next/image";
import { Link } from "./link";
import { NavbarMenu } from "./navbar-menu";
import { LinkButton } from "./link-button";

export function Navbar() {
  return (
    <nav className="mx-5 md:mx-20 px-5 md:px-10 h-16 md:h-20 bg-white rounded-b-2xl border border-black border-t-0 flex items-center justify-between gap-2">
      <div className="flex items-center justify-start">
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/assets/klub-ada-logo.svg"
            width={70}
            height={45}
            className="hidden md:block"
            alt="Klub ada logo"
          />
        </a>
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/assets/klub-ada-logo.svg"
            width={52}
            height={39}
            className="block md:hidden"
            alt="Klub ada logo"
          />
        </a>
      </div>
      <ol className="items-center gap-10 hidden md:flex">
        <li>
          <Link variant="tertiary" href="/o-nas">
            O nas
          </Link>
        </li>
        <li>
          <Link variant="tertiary" href="/blog">
            Blog
          </Link>
        </li>
        <li>
          <Link variant="tertiary" href="/partnerstvo">
            Partnerstva
          </Link>
        </li>
      </ol>
      <div className="hidden md:block">
        <LinkButton size="md" href="/dogodki">
          Vsi dogodki
        </LinkButton>
      </div>
      <NavbarMenu />
    </nav>
  );
}
