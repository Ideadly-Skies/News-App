import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md font-bold hover:bg-gray-100 dark:hover:bg-zinc-900"
        >
          Home
        </Link>

        <Link
          href="/about"
          className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md font-bold hover:bg-gray-100 dark:hover:bg-zinc-900"
        >
          About
        </Link>

        <Link
          href="/add-client"
          className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md font-bold hover:bg-gray-100 dark:hover:bg-zinc-900"
        >
          Add Client
        </Link>

        <Link
          href="/add-server"
          className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md font-bold hover:bg-gray-100 dark:hover:bg-zinc-900"
        >
          Add Server
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
