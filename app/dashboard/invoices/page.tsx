import { lusitana } from '@/app/ui/fonts';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Table from '@/app/ui/invoices/table';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const InvoicesPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
};

export default InvoicesPage;

// Updating teh table
// we need update the table to reflect the search query


// Best Practice: Debouncing 
// Debouncing: is a programming practice that limits the rate at which a function can fire. in our case, you only want to query the database when the user has stopped typing.

// How Debouncing works:
// trigger event: when an event that should be debounced (like a keystroke in the search box) occurs, a timer start.
// 2. wait: if a new event occurs before teh timer expires, the timer is reset.
// 3. Execution: if the timer reaches the end of its countdown, the debounced function is executed

// we can create out debounce function, however, if we want to keep things simple we will use a library called use-debounce