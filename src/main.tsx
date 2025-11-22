import { createRoot } from 'react-dom/client'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.scss'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import PokemonDetail from './components/detail/PokemonDetail.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ Global defaults for all queries
      refetchOnWindowFocus: false, // don’t refetch when switching tabs
      refetchOnReconnect: false,   // skip refetch after regaining connection
      retry: 1,                    // only retry once
      staleTime: 60 * 1000,        // 1 minute fresh
      gcTime: 5 * 60 * 1000,       // 5 min cache (v5)
      // cacheTime: 5 * 60 * 1000, // v4 equivalent if needed
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
   {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetail />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  </QueryClientProvider>,
)
