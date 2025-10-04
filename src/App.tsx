import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// const Home = lazy(() => import('./pages/Home'));
// const About = lazy(() => import('./pages/About'));
// const Products = lazy(()=> import ('./pages/Products'));
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Loader from './components/ui/Loader';
import './assets/styles/global.scss'

// component to scroll top initial rendering of page
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const RouteLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? <Loader /> : null;
};

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div className="min-h-screen bg-nature-light flex flex-col">
          <Navbar />
           <ScrollToTop />
            <RouteLoader />
          <main className="flex-grow">
               {/* <Suspense fallback={<Loader />}> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            {/* </Suspense> */}

          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;