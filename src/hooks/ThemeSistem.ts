import { useEffect, useState } from "react"

type ThemeOption = 'dark' | 'light' | 'system'

export function useThemeSystem() {

    const [theme, setTheme] = useState<ThemeOption>(() => {
        return (localStorage.getItem('theme') as ThemeOption) || 'dark'
    })

    useEffect(() => {
    const root = document.documentElement
    const savedTheme = (localStorage.getItem('theme') as ThemeOption) || 'dark'

    if (savedTheme === 'dark') {
        root.classList.add('dark')
    } else if (savedTheme === 'light') {
        root.classList.remove('dark')
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (systemPrefersDark) {
        root.classList.add('dark')
        } else {
        root.classList.remove('dark')
        }
    }
    }, [theme])

    return { theme, setTheme }
}