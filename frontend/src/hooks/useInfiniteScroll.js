import { useEffect, useRef } from 'react';

const useInfiniteScroll = (callback, hasMore) => {
    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    callback();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [callback, hasMore]);

    return observerRef;
};

export default useInfiniteScroll;
