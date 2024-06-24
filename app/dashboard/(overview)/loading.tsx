import DashboardSkeleton from '../../ui/skeletons';

const Loading = () => {
  return <DashboardSkeleton />;
};

export default Loading;

// NOTE: loading.tsx is a special Next.js file built on top of Suspense, it allows to create fallback UI to show as a replacement while the page content is loading. <SideNav /> is static it will render immediately and while dashboard is dynamic route will be loading;

// loading skeletons: a loading skeleton is a simplified version of the UI. in many website it is used a placeholder or fallback to indicate to the user that the content is loading.

// PROBLEM: loading.tsx apply to all child routes, since it is higher level than /invoices/page.tsx and /customer/page.tsx in file system, it is also applied to those pages. solutions: we can change the Route Groups by creating new folder call /(overview) inside the dashboard folder. then, move move the loading.tsx and DashboardPage.tsx to folder

// Route group allow us to organize file into logic group without affecting the url path structure. when we are creating a new folder with parenthesis (), the name will not affect the url path. for example in case of dashboard. /dashboard/(overview)/page.tsx become /dashboard. 

// in this context we are using a route group to ensure loading.tsx. only applies  to dashboard. we can also use route group to separate the application into section (e.g. (marketing) routes and (shop) routes or (pages) route);

// streaming a component: so far, we are streaming the whole page. but we can be more granular and stream specific component using React Suspense. 

// Suspense allows us to defer rendering parts of application until some condition is met. we can wrap the dynamic component in Suspense. we can sue the Suspense to stream only this component and immediately show the rest of the page' UI.

// in the case of the contact in Invoice page, we wrap the content into Suspense since we are dynamically fetching data. since the the rest of the inputs are not dynamic we can render UI immediately.

