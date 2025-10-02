import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(()=> import ('./pages/Products'));
import Loader from './components/ui/Loader';
import './assets/styles/global.scss'

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div className="min-h-screen bg-nature-light flex flex-col">
          <Navbar />
          <main className="flex-grow">
            
              <Routes>
                <Route path="/" element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
                <Route path="/about" element={<Suspense fallback={<Loader />}><About /></Suspense>} />
                <Route path="/products" element={<Suspense fallback={<Loader />}><Products /></Suspense>} />
              </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;