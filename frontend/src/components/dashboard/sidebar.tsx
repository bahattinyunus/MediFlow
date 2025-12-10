"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Users,
    Pill,
    Activity,
    Settings,
    LogOut,
    LayoutDashboard,
    Bell
} from "lucide-react"

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/portal",
        color: "text-sky-500",
    },
    {
        label: "Patients",
        icon: Users,
        href: "/portal/patients",
        color: "text-violet-500",
    },
    {
        label: "Prescriptions",
        icon: Pill,
        href: "/portal/prescriptions",
        color: "text-pink-700",
    },
    {
        label: "Analytics",
        icon: Activity,
        href: "/portal/analytics",
        color: "text-orange-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/portal/settings",
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/portal" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        {/* Logo placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg" />
                    </div>
                    <h1 className="text-2xl font-bold">
                        MediFlow
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="space-y-1">
                    <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition">
                        <div className="flex items-center flex-1">
                            <LogOut className="h-5 w-5 mr-3 text-red-500" />
                            Logout
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
