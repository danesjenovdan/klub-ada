import Image from "next/image";

export function Navbar() {
  return (
    <nav className="w-full shrink-0 px-2 md:px-3 h-16 md:h-18 border-b-2 border-red flex items-center gap-2">
      <div className="h-full flex items-center pr-2 pl-1 md:pr-4 border-r-2 border-red">
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/assets/hackathon/logo-a.svg"
            width={33}
            height={39}
            alt="Klub ada logo"
          />
        </a>
      </div>
    </nav>
  );
}
