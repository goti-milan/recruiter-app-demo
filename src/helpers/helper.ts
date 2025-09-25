import { Moment } from "moment";
import { toast, ToastOptions } from "react-toastify";


const baseOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        borderRadius: 8,
        padding: "12px 14px",
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        fontSize: 14,
        border: "1px solid rgb(0 0 0 / 10%)"
    },
};

export const showToast = (
    type: "success" | "error" | "warning" | "info",
    message: string
) => {
    const options: ToastOptions = { ...baseOptions };

    switch (type) {
        case "success":
            toast.success(message, options);
            break;
        case "error":
            toast.error(message, options);
            break;
        case "warning":
            // react-toastify uses warn as alias for warning
            toast.warn(message, options);
            break;
        case "info":
            toast.info(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
};

export const getTimeOrDate = (date: Moment) => {
    const now = new Date();
    return date.diff(now, "hours") < 24
        ? date.local().format("h:mm A")
        : date.local().format("MMM D, YYYY | h:mm A")
}

export const getPastTimeorDate = (date: Moment) => {
    const now = new Date();
    return date.diff(now, "hours") < 24
        ? date.local().format("h:mm A")
        : date.local().format("D-MM-YYYY")
}