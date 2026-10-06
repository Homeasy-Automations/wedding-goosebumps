"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "OFFERINGS", href: "/offerings" },
  { name: "GALLERIES", href: "/galleries" },
  { name: "INQUIRE", href: "/inquire" },
  
];
const eventLinks = [
  {
    title: "Pre Wedding",
    slug: "pre-wedding",
  },
  {
    title: "Post Wedding",
    slug: "post-wedding",
  },
  {
    title: "Haldi",
    slug: "haldi",
  },
];

const LOGO_URL = "/logo/Logo.png";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Lock only vertical scroll without touching global horizontal overflow clamp
    const body = document.body;
    if (isMenuOpen) {
      body.classList.add("scroll-lock");
    } else {
      body.classList.remove("scroll-lock");
    }
    return () => body.classList.remove("scroll-lock");
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        } ${isMenuOpen ? "!pointer-events-auto !translate-y-0 !opacity-100" : ""}`}
      >
        <div
          className={`transition-colors duration-300 ${isMenuOpen ? "bg-ivory" : "bg-ivory/90 backdrop-blur-md"}`}
        >
          <div className="mx-auto flex h-[64px] max-w-[1700px] items-center justify-between px-4 sm:h-[72px] sm:px-6 md:h-[81px] md:px-10 lg:px-16">
            <Link
              href="/"
              className="relative z-50 flex h-8 w-23 shrink-0 items-center sm:h-9 sm:w-28 md:h-12 md:w-31 lg:h-14 lg:w-36"
            >
              <Image
                src={LOGO_URL}
                alt="Wedding Goosebumps"
                width={78}
                height={31}
                className="h-full w-full object-contain"
                priority
              />
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-lora text-charcoal hover:text-gold text-[11px] tracking-[0.2em] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* EVENTS DROPDOWN */}
                <li className="group relative">
                  <button className="font-lora text-charcoal hover:text-gold flex items-center gap-1 text-[11px] tracking-[0.2em] transition-colors duration-300">
                    EVENTS
                    <svg
                      className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div className="invisible absolute top-full left-0 z-50 mt-5 w-64 translate-y-3 rounded-md border border-gray-200 bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {eventLinks.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/events/${item.slug}`}
                        className="hover:bg-ivory hover:text-gold block border-b border-gray-100 px-5 py-3 text-sm transition-colors last:border-none"
                      >
                        {item.title}
                      </Link>
                    ))}

                    <Link
                      href="/events"
                      className="text-gold block px-5 py-3 text-sm font-semibold"
                    >
                      View All Events →
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal z-50 p-2 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="sm:h-7 sm:w-7" />
              ) : (
                <Menu size={24} className="sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`bg-ivory fixed inset-0 z-30 transition-opacity duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center pt-[72px] sm:pt-[80px] md:pt-[88px]">
          <ul className="flex flex-col items-center gap-y-6 sm:gap-y-8">
            {navLinks.map((link) => (
              <li key={`${link.name}-mobile`}>
                <Link
                  href={link.href}
                  className="font-lora text-charcoal hover:text-gold text-sm tracking-[0.2em] transition-colors duration-300 sm:text-base"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
