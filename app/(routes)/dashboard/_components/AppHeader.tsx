"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Clock,
  CreditCard,
  User,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const menuOptions = [
  { id: 1, name: "Home", path: "/dashboard", icon: Home },
  { id: 2, name: "History", path: "/dashboard/history", icon: Clock },
  { id: 3, name: "Pricing", path: "/dashboard/billing", icon: CreditCard },
];

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => {
    if (!mounted) return false;
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" />
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-50 blur-md" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MediVoice AI
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuOptions.map((option) => {
              const Icon = option.icon;
              const active = isActive(option.path);
              return (
                <Link
                  key={option.id}
                  href={option.path}
                  className={`flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105 group ${
                    active
                      ? "text-primary bg-primary/10 px-3 py-2 rounded-lg"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform ${active ? "text-primary" : "group-hover:scale-110"}`}
                  />
                  <span>{option.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-all duration-300"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ))}
            </button>

            <UserButton />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {menuOptions.map((option) => {
                const Icon = option.icon;
                const active = isActive(option.path);
                return (
                  <Link
                    key={option.id}
                    href={option.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-accent"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{option.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
