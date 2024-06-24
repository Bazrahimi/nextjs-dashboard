import DashboardSkeleton from '../ui/skeletons';

const Loading = () => {
  return <DashboardSkeleton />;
};

export default Loading;

// NOTE: loading.tsx is a special Next.js file built on top of Suspense, it allows to create fallback UI to show as a replacement while the page content is loading. <SideNav /> is static it will render immediately and while dashboard is dynamic route will be loading;

// loading skeletons: a loading skeleton is a simplified version of the UI. in many website it is used a placeholder or fallback to indicate to the user that the content is loading.
