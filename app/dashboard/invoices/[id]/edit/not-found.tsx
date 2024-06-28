import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const InvoiceNotFound = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
};

export default InvoiceNotFound;

// NOTE: transition-colors:  is used to add a smooth transition effect from color change. this class makes changes to color properties transition gradually instead of happening instantaneously.

// in previous chapter: we learned hwo to catch error( including 404 errors) and display a fallback to the user. however, we still need to solve a problem. form validation. lets see how to implement server-side validation with Server Action. and how you can show form errors using React's useActionState hook - while keeping accessibility in mind!

// what is accessibility: 
// accessibility refers to designing and implementing web application that everyone can use, including those with disabilities. it is a vast topic that cover many areas. such as keyboard  navigation, semantic HTML, images, colors, videos, etc.
// in here we are just going through accessibility features available in Next.js and some common practice to make your application more accessible.

// Using the ESlint accessibility plugin in Next.js. 
// Next.js include plugin in its ESlint config to help catch accessibility issue early. For example this plugin warns if you have image without alt text, use the aria- and role attribute incorrectly, and more.
