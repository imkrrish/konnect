import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export interface IReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const ReactQueryProvider: FC<IReactQueryProviderProps> = ({ children }) => {
  const [showDevTools, setShowDevTools] = React.useState(false);
  React.useEffect(() => {
    // @ts-expect-error
    window.toogleDevtools = () => setShowDevTools((old) => !old);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
      {showDevTools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
};
export default ReactQueryProvider;
