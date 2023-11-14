"use client";

import { ThemeProvider } from "next-themes";
import { ReduxProvider } from "@/redux/provider";

const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <ReduxProvider>
     <ThemeProvider attribute="class">
       {children}
     </ThemeProvider>
    </ReduxProvider>
  )
}

export default Providers;