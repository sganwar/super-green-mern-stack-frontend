export {};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      on<T = unknown>(event: string, cb: (resp: T) => void): void;
      open(): void;
    };
  }
}
