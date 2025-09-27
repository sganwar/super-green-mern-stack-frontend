import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/styles/theme';
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CustomToasterProvider from './components/ui/CustomToasterProvider.tsx';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 5 * 60 * 1000, // 5 minutes
      // retry: 2,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <CustomToasterProvider />
    </QueryClientProvider>
  </StrictMode>,
)




