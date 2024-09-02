import { toast } from "sonner";

export const toastError = (message: string) => {
  toast(message, {
    closeButton: true,
    position: "top-right",
  });
};
