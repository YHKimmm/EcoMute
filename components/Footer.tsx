import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4 text-gray-200">
      <div className="max-w-5xl xl:max-w-5xl mx-auto divide-y divide-gray-900 px-4 sm:px-6 md:px-8">
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <Link
            href="https://github.com/YHKimmm/EcoMute"
            className="text-md text-gray-200 hover:text-white transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight"
          >
            © 2023 ECOMUTE Inc.
          </Link>
        </ul>
      </div>
    </footer>
  );
}
