"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunnyIcon from "@/public/sunny.svg";
import MoonIcon from "@/public/moon.svg";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounded] = useState(false);

  const handleThemeChange = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    setMounded(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button className="dark:bg-blackberry bg-lilac py-3 px-4 border border-1 dark:border-[#232336] border-lilac rounded-md flex items-center ml-4 hover:cursor-pointer"
      onClick={handleThemeChange}>
      {resolvedTheme === "dark" && <SunnyIcon />}
      {resolvedTheme === "light" && <MoonIcon />}
    </button>
  )
}

export default ThemeToggle;