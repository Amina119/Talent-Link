import { uiStore } from "./uiStore";

export const toast = {
  success: (message: string) =>
    uiStore.getState().addToast(message, "success"),

  error: (message: string) =>
    uiStore.getState().addToast(message, "error"),

  info: (message: string) =>
    uiStore.getState().addToast(message, "info"),
};
