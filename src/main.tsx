import { createRoot } from 'react-dom/client'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.scss'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router';
import PokemonDetail from './components/detail/PokemonDetail.tsx';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/common/PageTransition.tsx';
import { cloneElement } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ Global defaults for all queries
      refetchOnWindowFocus: false, // don't refetch when switching tabs
      refetchOnReconnect: false,   // skip refetch after regaining connection
      retry: 1,                    // only retry once
      staleTime: 60 * 1000,        // 1 minute fresh
      gcTime: 5 * 60 * 1000,       // 5 min cache (v5)
      // cacheTime: 5 * 60 * 1000, // v4 equivalent if needed
    },
  },
});

// AnimatedOutlet component to handle route transitions
function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {element && cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}

// Layout component
function Layout() {
  return <AnimatedOutlet />;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PageTransition>
            <App />
          </PageTransition>
        ),
      },
      {
        path: "/pokemon/:id",
        element: (
          <PageTransition>
            <PokemonDetail />
          </PageTransition>
        ),
      },
      {
        path: "*",
        element: (
          <PageTransition>
            <App />
          </PageTransition>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
)
