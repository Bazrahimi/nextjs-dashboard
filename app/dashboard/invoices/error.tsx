'use client';
import { useEffect } from 'react';

const InvoiceErrors = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something Went Wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoice route
          () => reset()
        }
      >
        Try Again
      </button>
    </main>
  );
};

export default InvoiceErrors;


// NOTE:
// 1. error.tsx needs to be a client component
// 2. it accepts two props: error: this Object is an instance of JavaScript native Error. reset: This is a function to reset the error boundary. when executed, the function will try to re-render the route segment.

// Handling 404 errors with the notFound function
// error.tsx is used to catch all error. notFound function is used to when you try to fetch a resource that does not exist.

// for example. if we use a fake invoiceId, it show the default error. in here notFound function can useful to handle error correctly since the resource does not exist.
// 