import Link from "next/link";
import { redirect } from "next/navigation";

import { appNavigation, routes } from "@/config/routes";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-account-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession();

  if (!session) {
    return redirect(routes.main.signin);
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40">
        <div className="border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={appNavigation.app} />
            <div className="flex flex-row gap-4">
              <Link href={routes.dashboard.billing}>
                <Button variant={"outline"}>Upgrade</Button>
              </Link>
              <UserNav
                name={session?.user?.name}
                email={session?.user?.email}
                image={session?.user?.image}
              />
            </div>
          </div>
        </div>
      </header>
      <div className="container grid">
        <main className="flex w-full flex-col overflow-hidden pt-4">
          {children}
        </main>
      </div>
    </div>
  );
}
