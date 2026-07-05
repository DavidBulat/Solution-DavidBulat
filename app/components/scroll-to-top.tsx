import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const SCROLL_THRESHOLD = 300;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Button
      type="button"
      size="icon"
      aria-label="Scroll to top"
      className={cn(
        "fixed right-4 bottom-4 z-40 size-10 rounded-full shadow-md sm:hidden"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUpIcon />
    </Button>
  );
}
