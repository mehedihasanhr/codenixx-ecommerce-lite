import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

if (typeof global === "undefined") {
    window.global = window;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const AppLayer = ({children}) => {
            return (
                <>
                    <Toaster closeButton/>
                    {children}
                </>
            )
        }

        root.render(<AppLayer>
            <App {...props} />
        </AppLayer>);
    },
    progress: {
        color: "#4B5563",
    },
});
