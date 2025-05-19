import { useCallback, useEffect, useRef } from "react";

export function useInfiniteScroll(callbackParam:()=>void, isActive:boolean) {
  const observer = useRef<IntersectionObserver | null>(null);
 
  const callback = useCallback(
    (entries:IntersectionObserverEntry[]) => {
      if (entries.length === 0) {
        return;
      }
 
      if (entries[0].isIntersecting && isActive) {
        callbackParam();
      }
    },
    [callbackParam, isActive],
  );
 
  const infiniteScrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        return;
      }
 
      observer.current?.disconnect();
 
      observer.current = new IntersectionObserver(callback);
      observer.current.observe(node);
    },
    [callback],
  );
 
  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);
 
  return infiniteScrollRef;
}