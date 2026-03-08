import { useEffect, useRef } from 'react';

const useInfiniteScroll = (callback, hasMore) => {
    const observerRef = useRef();

    useEffect(() => {
        const currentObserverRef = observerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    callback();
                }
            },
            { threshold: 1.0 }
        );

        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [callback, hasMore]);

    return observerRef;
};

export default useInfiniteScroll;
