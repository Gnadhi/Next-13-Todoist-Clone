import React from "react";

import AccountHeader from "@/ui/app/AccountPage/Header";

const secondaryNavigation = [
  { name: "Account", href: "/app/account" },
  { name: "Teams", href: "/app/account/team" },
];

//This contains the account navigation
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AccountHeader navItems={secondaryNavigation} />
      {children}
    </main>
  );
}
