import { Suspense } from 'react';
import {
  fetchCardData,
  fetchLatestInvoices,
  fetchRevenue,
} from '../../lib/data';
import { Card } from '../../ui/dashboard/cards';
import LatestInvoices from '../../ui/dashboard/latest-invoices';
import RevenueChart from '../../ui/dashboard/revenue-chart';
import { lusitana } from '../../ui/fonts';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';

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
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl  `}>
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
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
};

export default DashboardPage;

// NOTE: we have two problem that we need to be aware in here. 1. The data request are unintentionally blocking each other, creating a request waterfall. 2, By default, Next.js pre-renders routes to improve performance, this is called Static Rendering. so if your data changes, it won't be reflected in your dashboard.

// what are request Waterfall?: a waterfall refer to a sequence of network requests that depend on the completion of previous request. in the case of data fetching, each request begin only when the previous request has returned data.
// in the above case, fetchLatestInvoice wait for fetchRevenue() to finish it before it begin. fetchCardData() wait before teh fetchLatestInvoice begin.

// waterfall is not necessarily bad. sometime it quite useful, for example and in case of get data for specific id, we need get the id first the once id complete, we can use the id to fetch relevant data for the id.

// Parallel data fetching: a common way to avoid waterfall is to initiate all data request at the same time  in parallel. in javascript we are able to "Promise.all()" or Promise.allsettled() functions to initiate all promises at the same time. for example,

//  we improve performance to by executing all data at same time. however, there is still one disadvantages, what if one data request is slower than all others.

// Static Rendering: data fetching and rendering happens on the server on at build time(during deployment) or when revalidating data.
// whenever a user visit the application, the cached result is served. there are a couple of benefits of static rendering. Faster Website: pre-rendered content can be cached and globally distributed. this ensure that user around the world can access website's content more quickly and reliably.  Reduced Server load: because the content is cached, the server does not have to dynamically generate content for each user request. SEO: Pre-rendered content is easier for search engine crawler o index, as the content is already available when the page loads. static data is useful for data that is not change, it useful pages, such homepage, about, contact, or portfolio, since there are user id needed. Static rendering is not useful for pages such as dashboard where the the data change frequently.

// What is Dynamic Rendering? with dynamic rendering, content is rendered on the server for each user at request time(when the user visit the page). There are a couple of benefits of dynamic rendering: Real-time Data, useful application where data changes frequently. User-Specific Content: it is easier to serve personalized data for a specific user. Request Time information: Dynamic rendering allows you to access information that can only be know at request time, such as cookies or the URL search parameters.

// the dashboard application we aer building is dynamic. However, there is still one problem. what happens if one data request is slower than all the others.

// what is streaming? streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server and progressively stream them from the server to the client as they become ready. By streaming, we can prevent slow data requests from blocking the whole page. This allows the user to see and interact with parts of the page: streaming work well with react's component model, as each component can be considered a chunk. there are two ways to implement streaming in Next.js 1. at the page level, with the loading.tsx file. 2. for specific components with < Suspense >

//  fetchRevenue() is slowing down the whole page, since we are delaying to execution. in stead of blocking the whole page, we can use suspense to stream only this component and immediately show the rest of the page's UI.
