import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/primitive/button";
import { Menu, X, Zap, ArrowUpRight, LogIn } from "lucide-react";

const NAV_ITEMS = [
    { label: "Services", href: "/services" },
    { label: "Assessment", href: "/assessment" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export function ShadcnNavbar() {
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-neutral-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-bold text-lg tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md transition-transform duration-200 hover:scale-105"
                >
                    <span aria-label="Arco Digital Performance" className="drop-shadow-sm">arco</span>
                </Link>
                {/* Desktop nav */}
                <nav className="hidden md:flex gap-2" role="navigation">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href as any}
                            className={cn(
                                "px-3 py-2 rounded-md text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                                pathname === item.href ?
                                    "text-primary bg-primary/10 shadow-sm" :
                                    "text-neutral-700 hover:text-primary hover:bg-primary/10"
                            )}
                            aria-current={pathname === item.href ? 'page' : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                {/* CTA + Login */}
                <div className="flex items-center gap-2">
                    <Link href={"/login" as any} className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-neutral-600 hover:text-primary hover:bg-primary/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
                        <LogIn className="w-4 h-4 mr-1" />
                        Login
                    </Link>
                    <Button
                        asChild
                        size="lg"
                        className="hidden md:inline-flex bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold shadow-md hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition animate-pulse-once"
                    >
                        <Link href={"/audit" as any}>
                            <Zap className="w-4 h-4 mr-2 animate-bounce-slow" />
                            Request Your Free Audit
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Open menu"
                        aria-expanded={open}
                    >
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>
            {/* Mobile nav + Backdrop */}
            {open && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} aria-hidden="true" />
                    <nav className="fixed top-16 left-0 right-0 z-50 md:hidden bg-white/98 border-t border-neutral-200 shadow-lg animate-in fade-in slide-in-from-top-2 p-4 rounded-b-2xl">
                        <div className="flex flex-col gap-2">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href as any}
                                    className={cn(
                                        "px-3 py-3 rounded-md text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                                        pathname === item.href ?
                                            "text-primary bg-primary/10 shadow-sm" :
                                            "text-neutral-700 hover:text-primary hover:bg-primary/10"
                                    )}
                                    aria-current={pathname === item.href ? 'page' : undefined}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link href={"/login" as any} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-neutral-600 hover:text-primary hover:bg-primary/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
                                <LogIn className="w-4 h-4 mr-1" />
                                Login
                            </Link>
                            <Button
                                asChild
                                size="lg"
                                className="mt-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold shadow-md focus-visible:ring-2 focus-visible:ring-emerald-400/60 animate-pulse-once"
                            >
                                <Link href={"/audit" as any} onClick={() => setOpen(false)}>
                                    <Zap className="w-4 h-4 mr-2 animate-bounce-slow" />
                                    Request Free Audit
                                    <ArrowUpRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </nav>
                </>
            )}
        </header>
    );
}

export default ShadcnNavbar;
