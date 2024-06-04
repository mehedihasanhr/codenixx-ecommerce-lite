import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";


export const usePageLoading = () => {
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        // Listen for Inertia events
        Inertia.on('start', () => {
            setIsLoading(true);
        });

        Inertia.on('finish', (event) => {
            if (!event.detail.visit.completed) {
                setIsLoading(false);
            }
        });

        Inertia.on('success', () => {
            setIsLoading(false);
        });

        Inertia.on('error', () => {
            setIsLoading(false);
        });
    }, []);

    return isLoading;
}
