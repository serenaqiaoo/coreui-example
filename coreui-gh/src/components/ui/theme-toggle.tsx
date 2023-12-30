import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    console.log('theme', theme);
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => { console.log('goint to set theme to: ', theme); setTheme(theme === "light" ? "dark" : "light"); }}
        >
            <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
