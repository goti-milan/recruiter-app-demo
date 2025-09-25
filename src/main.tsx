import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { ToastContainer } from "react-toastify";
import { twMerge } from "tailwind-merge";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./helpers/query.config.ts";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";

import "./index.css";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PrimeReactProvider
            value={{
                unstyled: true,
                pt: Tailwind,
                ptOptions: {
                    mergeSections: true,
                    mergeProps: true,
                    classNameMergeFunction: twMerge,
                },
                ripple: true,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
            <ToastContainer
                autoClose={2000}
                limit={3}
                closeButton
                pauseOnFocusLoss={false}
                pauseOnHover
                theme="light"
                position="top-right"
            />
        </PrimeReactProvider>
    </StrictMode>
);
