import React, { useEffect, useState } from "react";
import { DataProvider } from "@plasmicapp/loader-nextjs";

export interface ScrollContextValue {
  isScrolled: boolean;
  isTop: boolean;
}

export const ScrollContext = React.createContext<ScrollContextValue>({
  isScrolled: false,
  isTop: true,
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  console.log('ScrollProvider is running');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsScrolled(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsScrolled(false);
        }
        
        // Check if at the top of the page
        setIsTop(currentScrollY === 0);
        
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  return (
    <DataProvider name="scrollState" data={{ isScrolled, isTop }}>
      {children}
    </DataProvider>
  );
}