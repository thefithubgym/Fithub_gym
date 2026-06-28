import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-container w-full border-t border-outline-variant py-16 px-4 md:px-container-margin">
      <div className="max-w-7xl md:px-container-margin mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:items-center">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-md md:pr-xl">
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-md">
              <Logo />
              <div className="h-6 w-px bg-primary block" />
            </div>
            <div className="flex gap-md">
              <a
                href="https://www.instagram.com/thefithubgym.narkhed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs text-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 shrink-0"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="mailto:millennialcorpllp@gmail.com"
                className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs text-xs"
              >
                <Mail className="w-6 h-6 shrink-0" />
              </a>
            </div>
          </div>

          <p className="text-on-surface-variant">
            Premium Unisex Fitness Center designed for high-performance training and unparalleled luxury. Forged in discipline, engineered for results.
          </p>
        </div>

        <div className="col-span-1 md:col-span-3 flex justify-between items-center w-full h-fit flex-wrap sm:flex-nowrap gap-sm">
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">Home</Link>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#training">Training</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#memberships">Memberships</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#coaches">Coaches</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#contact">Contact</a>
          <div className="h-6 w-px bg-outline-variant/40 block" />
          <Link className="transition-colors text-sm font-semibold text-primary" href="/auth/login">Login</Link>
        </div>
      </div>

      {/* Below footer: copyright (left) and legal links (right) */}
      <div className="max-w-7xl md:px-container-margin mx-auto border-t border-outline-variant/20 mt-xl pt-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-md text-xs text-on-surface-variant">
        <div className="flex flex-col gap-xs">
          <div className="text-on-surface-variant/70">
            © {new Date().getFullYear()} The FitHub Gym by Millenial Corp LLP. All rights reserved.
          </div>
        </div>
        <div className="flex gap-lg justify-end">
          <Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link>
          <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
