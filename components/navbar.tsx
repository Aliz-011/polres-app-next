'use client';

// components
import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from './toggle-theme';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="dark:bg-inherit shadow-sm w-full dark:border-b">
      <div className="flex h-16 py-4 items-center max-w-5xl mx-auto">
        <Link href="/" className="font-bold text-lg mr-6">
          POLRES
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
