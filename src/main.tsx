import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { EnvProvider } from './context/EnvContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EnvProvider>
     <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </EnvProvider>
  </React.StrictMode>
);