import { toast } from "react-toastify";

let slowNetworkToastId: string | number | null = null;

export const checkNetworkSpeed = async (): Promise<void> => {
  const testUrl = "https://jsonplaceholder.typicode.com/todos/1"; // reliable CORS endpoint
  const start = performance.now();

  try {
    await fetch(testUrl, { cache: "no-cache" });
  } catch (_err: unknown) {
    showSlowNetworkWarning("Your internet seems offline or unstable.");
    return;
  }

  const duration = performance.now() - start;

  if (duration > 2000) {
    showSlowNetworkWarning("Your network is slow. You may experience delay.");
  } else {
    hideSlowNetworkWarning();
  }
};

const showSlowNetworkWarning = (msg: string): void => {
  if (!slowNetworkToastId) {
    slowNetworkToastId = toast.warning(msg, {
      autoClose: false,
      toastId: "slow_network",
    });
  }
};

const hideSlowNetworkWarning = (): void => {
  if (slowNetworkToastId !== null) {
    toast.dismiss(slowNetworkToastId);
    slowNetworkToastId = null;
  }
};
