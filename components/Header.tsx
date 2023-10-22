import React from "react";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Language selector */}
          {/* Session && ( ... ) */}

          {/* DarkMode toggle */}
          <DarkModeToggle />
          
          {/* User button */}
        </div>
        <div />
      </nav>
      {/* Upgrade banner */}
    </header>
  );
};

export default Header;
