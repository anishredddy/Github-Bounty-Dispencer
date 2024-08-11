import React from "react";

import Link from "next/link";

interface SideBarItemProps {
  href: string;
  onClick?: () => void;
  active?: boolean;
  text: string;
}

const NavBarItem: React.FC<SideBarItemProps> = ({
  href,
  onClick,
  active,
  text,
}) => {
  return (
    <nav className="flex items-center space-x-5 lg:space-x-7">
      <Link
        href={href}
        className={`text-sm font-medium transition-colors hover:text-primary ${
          active ? "text-black dark:text-white" : "text-muted-foreground"
        }`}
      ></Link>
      <p className="text-white">{text}</p>
    </nav>
  );
};

export default NavBarItem;
