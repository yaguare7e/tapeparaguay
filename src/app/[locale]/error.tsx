"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-red-500">!</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
