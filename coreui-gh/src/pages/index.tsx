import { Inter } from 'next/font/google'
import SettingsLayout, { SidebarNavItem } from '@/components/ui/settings-layout'
import { DashbaordPageContent } from '@/components/DashboardPageContent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const sidebarNavItems: SidebarNavItem[] = [
    {
      title: 'Dashboard',
      href: '/'
    },
    {
      title: 'Dashboard',
      href: '/'
    },
  ]
  return (
    <SettingsLayout sidebarNavItems={sidebarNavItems}>
      <DashbaordPageContent />
    </SettingsLayout>
  )
}
