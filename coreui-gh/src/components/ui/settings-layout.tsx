

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { siteConfig } from "@/config/site"

export interface SidebarNavItem {
    title: string; // display name for the vertical tab
    href: string; // nextjs relative url, eg. home page is '/'
}

interface SettingsLayoutProps {
    children: React.ReactNode;
    sidebarNavItems: SidebarNavItem[];
    showLeftSidebar?: boolean;
}

export default function SettingsLayout({ children, sidebarNavItems, showLeftSidebar = false }: SettingsLayoutProps) {
    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">{siteConfig.name}</h2>
                    <p className="text-muted-foreground">
                        {siteConfig.description}
                    </p>
                </div>

                <Separator className="my-6" />
                <div className="flex flex-col space-y-8">
                    {showLeftSidebar && (<aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>)}
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </>
    )
}
