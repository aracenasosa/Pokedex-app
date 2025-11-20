// shared/hooks/useAutoPager.ts
import { useEffect, useRef } from "react";

type InfiniteLike = {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => Promise<unknown>;
};

type Options = {
  rootMargin?: string;     // how early to prefetch
  burstPages?: number;     // how many pages per trigger
};

export function useAutoPager(active: InfiniteLike, opts: Options = {}) {
  const { rootMargin = "1000px 0px", burstPages = 2 } = opts;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false); // prevent overlapping bursts

  useEffect(() => {
    if (!sentinelRef.current) return;

    const node = sentinelRef.current;

    const handler = async (entries: IntersectionObserverEntry[]) => {
      const first = entries[0];
      if (!first.isIntersecting) return;
      if (!active.hasNextPage) return;
      if (lockRef.current) return;

      lockRef.current = true;
      try {
        // Do a small "burst" to get ahead of fast scrolls.
        for (let i = 0; i < burstPages; i++) {
          if (!active.hasNextPage) break;
          await active.fetchNextPage();
        }
      } finally {
        // give the UI a breath before allowing another burst
        setTimeout(() => { lockRef.current = false; }, 120);
      }
    };

    const io = new IntersectionObserver(handler, { rootMargin });
    io.observe(node);
    return () => io.disconnect();
  }, [active.hasNextPage, active.fetchNextPage, rootMargin, burstPages]);

  return { sentinelRef };
}
