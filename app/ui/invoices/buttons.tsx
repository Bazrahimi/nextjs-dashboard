import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// flex: makes the Link element a flex container, enabling the use of flexbox properties.
// h-10: set the height of Link element to 10 units
// items-center: vertically centers the child element along the cross axis.
// rounded-lg: apply large rounded corners to the link element
// bg-blue-600: sets background color to blue shad 600
// px-4: add horizontal padding of 4 units (1 rem)
// text-sm: set the text size to small
// text-white: set the text color to white
// transition-colors: Enables smooth transition from color change (used in hover and focus state)
// focus-visible: applies outline when element receives keyboard focus.
// focus-visible: 

// For the inner element:
// hidden: hides the 'span' element by default.
// md: display the span element when medium display.
// h-5: Set the height of the 'PlusIcon' to 5 units
// md: add a left margin of 4 units


export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
