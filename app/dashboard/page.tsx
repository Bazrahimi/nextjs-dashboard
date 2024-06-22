import { fetchLatestInvoices, fetchRevenue, fetchCardData } from '../lib/data';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import RevenueChart from '../ui/dashboard/revenue-chart';
import { lusitana } from '../ui/fonts';
import { Card } from '../ui/dashboard/cards';

const DashboardPage = async () => {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
};

export default DashboardPage;

// NOTE: Next.js us file-system routing. Each folder represent a route segment that maps to a URL segment.
// app: is the Root Segment
// dashboard: is the segment
// invoices: is the leaf Segment

// we can create separate UIs for each routing using layout.tsx and page.tsx files.

// page.tsx is a special next.s file that export a react component. all other files such lib and ui will be colocate inside the dashboard which will not be publicly assessable.
