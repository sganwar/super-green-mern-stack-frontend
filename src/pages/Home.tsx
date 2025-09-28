import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import toast from 'react-hot-toast';
import { useCoupon } from '../hooks/useCoupon';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Fade,
  Grow,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import {
  LocalFlorist as PlantIcon,
  Forest as ForestIcon,
  Close as CloseIcon,
  WaterDrop as WaterIcon,
  Redeem as RedeemIcon
} from '@mui/icons-material';
import { motion } from "framer-motion";   // ✅ already tiny + tree-shakable
import Loader from '../components/ui/Loader';
import LoaderOverlay from '../components/ui/LoaderOverlay';
import PlantCounter from '../components/ui/PlantCounter';
import type { RazorpayPaymentResponse } from '../types/razorpay';
const ManualCouponFetchModal = lazy(() => import('../components/ui/ManualCouponFetchModal'));
const SuperCouponModal = lazy(() => import('../components/ui/SuperCouponModal'));
const PUBLIC_LOGO = 'https://www.supergreen.co.in/logo.png'; // Public Logo for Razorpay
const MAXIMUM_TREE_COUNT = 10; // Set a maximum limit for tree planting at a time

// stats data for her section
const STATS_DATA = [
  { icon: <ForestIcon />, text: "500+ Trees Planted", color: "nature-primary" },
  { icon: <WaterIcon />, text: "Clean Air Generated", color: "nature-secondary" },
  { icon: <PlantIcon />, text: "Lives Impacted", color: "nature-forest" }
];
// calculate price based on count 
const calculatePrice = (count: number) => count * 99;
// calculate co2 absorption based on count
const calculateCO2 = (count: number) => count * 48;
// get dynamic plant description based on count to display in impact info section

const Home: React.FC = () => {
  const { pathname } = useLocation(); //for handling scroll to top on page load
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [showDonateForm, setShowDonateForm] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string>('');
  const [showManualCouponFetchModal, setShowManualCouponFetchModal] = useState<boolean>(false);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState<boolean>(false);
  const [lastManualSubmission, setLastManualSubmission] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    contact: ''
  });
  const { data: couponData, error: couponError, isLoading: isCouponLoading, isError: isCouponError } = useCoupon(paymentId);

  // Validate donation donation form inputs
  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      contact: ''
    };
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.contact.trim()) {
      errors.contact = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.contact.replace(/\D/g, ''))) {
      errors.contact = 'Please enter a valid 10-digit phone number';
    }
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.contact;
  };

  // handle razorpay payment button click
  const handlePayment = () => {
    // if donation form is invalid, return. don't proceed to payment
    if (!validateForm()) return;

    // close the donation form modal
    setShowDonateForm(false);

    // options for razorpay payment integration
    const options = {
      "key": "rzp_live_RJpArHowLAOS2l", // live mode public key
      // "key": "rzp_test_RJp1B7TPct9hmi", //test mode public key
      // "amount": (calculatePrice(selectedCount) * 100).toString(), //live mdoe
      "amount": 100, //test mode
      "name": "Super Green NGO",
      "image": PUBLIC_LOGO,
      "description": `Plant ${selectedCount} Tree${selectedCount > 1 ? 's' : ''}`,
      "prefill": {
        "name": formData.name,
        "email": formData.email,
        "contact": formData.contact
      },
      modal: {
        ondismiss: function () {
          document.body.style.overflow = '';
          setIsRazorpayModalOpen(false);
        },
      },
      "notes": {
        "customer_name": formData.name,
        "email": formData.email,
        "phone": formData.contact,
        "tree_count": selectedCount.toString(),
        "price_per_unit": "99",
        "total_calculation": `${selectedCount} * 99 = ${calculatePrice(selectedCount)}`,
      },
      "handler": function (response: RazorpayPaymentResponse) {
        console.log("✅ Payment successful! Payment ID:", response.razorpay_payment_id);
        document.body.style.overflow = '';
        setIsRazorpayModalOpen(false)
        setPaymentId(response.razorpay_payment_id); // This triggers the React Query
      },
      "theme": {
        "color": "#2E7D32",
        "backdrop_color": "#000000b7"
      }
    };

    // instantiate razorpay object
    const rzp = new window.Razorpay(options);

    // handle payment failure
    rzp.on('payment.failed', function (response: RazorpayPaymentResponse) {
      console.log("❌ Payment failed:", response);
      toast.error("Payment failed. Please try again.");
      document.body.style.overflow = '';
      setIsRazorpayModalOpen(false)
    });

    // close the donation form modal here to avoid razropay ui conflict in mobile
    setShowDonateForm(false);
    // set razorpayl modal open to perform loader view
    setIsRazorpayModalOpen(true)
    // open razorpay payment modal
    rzp.open();

    // Prevent background scrolling when payment modal is open (delay to ensure it applies after modal opens fully)
    setTimeout(() => {
      document.body.style.overflow = 'hidden';
    }, 1000);
  };

  // Handle donation form input changes and clear errors on change
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Adjust plant count with limits
  const adjustCount = useCallback((increment: boolean) => {
    setSelectedCount(prev => {
      if (increment) {
        if (prev >= MAXIMUM_TREE_COUNT) {
          toast.error(`You can plant a maximum of ${MAXIMUM_TREE_COUNT} trees at a time.`);
          return prev;
        }
        return prev + 1;
      } else {
        return Math.max(prev - 1, 1);
      }
    });
  }, []);

  // Scroll to top on component mount to avoid scroll position issues on new page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // if coupon fetching fils in react query
  // Modify the error useEffect
  useEffect(() => {
    if (isCouponError && paymentId && paymentId === lastManualSubmission) {
      console.error("Coupon fetch error:", couponError);
      toast.error(couponError?.message || "Coupon fetching error", {
        duration: 600000,
      });
      // Reset after showing error
      setLastManualSubmission(null);
    }
  }, [isCouponError, couponError, paymentId, lastManualSubmission]);

  return (
    <Box className="home-page min-h-screen">

      {isCouponLoading && (<><LoaderOverlay message='wait! we have a coupon for you' /></>)}
      {isRazorpayModalOpen && (<LoaderOverlay message='Please wait! Payment is setting up... ' />)}

      {/* Hero Section */}
      <Box className="relative overflow-hidden hero-section">
        <Container maxWidth="lg" className="relative py-16">
          <Box className="text-center space-y-6 flex flex-col items-center">
            <Fade in={true} timeout={1000}>
              <Typography
                variant="h2"
                className="text-white !font-medium mb-4 !font-display"
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                Fund the Future Forest
              </Typography>
            </Fade>

            <Fade in={true} timeout={1500}>
              <Typography
                variant="h5"
                className="text-white mb-8 max-w-3xl mx-auto text-center text-xl md:text-2xl !font-body"
              >
                🌱 Every seed we plant today grows into tomorrow's oxygen. Join us in creating a greener,
                cleaner world - one tree at a time.
              </Typography>
            </Fade>

            <Box className="flex justify-center gap-8 mb-8 flex-wrap text-white">
              {STATS_DATA.map((stat, index) => (
                <Grow in={true} timeout={1000 + index * 200} key={index}>
                  <Chip
                    sx={{ color: 'green', backgroundColor: 'white' }}
                    icon={stat.icon}
                    label={stat.text}
                    className={`bg-${stat.color} text-white px-4 py-2 text-lg font-medium`}
                    size="medium"
                  />
                </Grow>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Plant Selection Section */}
      <Container maxWidth="lg" className="py-16 relative">
        <Box className="text-center mb-2">
          <Typography variant="h4" className="text-nature-primary font-bold mb-4 !font-modern">
            Choose Your Green Impact
          </Typography>
          <Typography variant="h6" className="text-nature-dark">
            Select how many trees you'd like to plant!
          </Typography>
        </Box>

        <Box className="max-w-2xl mx-auto">
          <PlantCounter
            selectedCount={selectedCount}
            adjustCount={adjustCount}
            onDonateClick={() => setShowDonateForm(true)}
          />
        </Box>
      </Container>

      {/* ✅ Redeem Coupon Section */}
      <Container maxWidth="lg" className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl p-1"
        >
          <Box
            className="flex flex-col md:flex-row items-center justify-between
                 bg-dark-gradient rounded-lg px-8 py-10 gap-8 celebratory-bg"
          >
            <Box className="text-center md:text-left">
              <Typography variant="h4" className="font-bold text-white !tracking-tight !mb-6 !font-mono">
                Already Donated?
              </Typography>
              <Typography variant="body1" className="text-white !align-middle">
                Enter your Payment ID we sent via Email & redeem your
                <span className="font-semibold text-nature-dark text-xl whitespace-nowrap !align-middle"> Super Green Coupon</span>.
              </Typography>
            </Box>

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Button
                onClick={() => setShowManualCouponFetchModal(true)}
                variant="contained"
                startIcon={<RedeemIcon />}
                className="bg-nature-primary hover:bg-nature-dark text-white
                     font-semibold px-10 py-4 rounded-xl shadow-xl
                     transition-all duration-300"
                sx={{ textTransform: "none" }}
              >
                Redeem Now
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>



      {/* Donation Form Modal */}
      <Dialog
        open={showDonateForm}
        onClose={() => setShowDonateForm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px'
          },
        }}
      >
        <DialogTitle className="text-center bg-nature-gradient text-white" sx={{ pb: 1 }}>
          <Box className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold">
              Donation Form
            </Typography>
            <IconButton onClick={() => setShowDonateForm(false)} className="text-white !bg-white">
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent className="p-8" sx={{ pt: 4 }}>
          <Box className="space-y-6">
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
              variant="outlined"
              className='!mt-4'
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Phone Number"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              error={!!formErrors.contact}
              helperText={formErrors.contact}
              variant="outlined"
            />

            <Box className="text-center bg-nature-light p-4 rounded-lg">
              <Typography variant="h6" className="text-nature-primary font-bold">
                {selectedCount} Tree{selectedCount > 1 ? 's' : ''} - ₹{calculatePrice(selectedCount)}
              </Typography>
              <Typography variant="body2" className="text-nature-dark">
                {calculateCO2(selectedCount)} lbs of CO₂ absorbed annually
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePayment}
              className="bg-nature-primary hover:bg-nature-dark py-3 text-lg font-bold rounded-lg"
              sx={{ textTransform: 'none' }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Fetch Coupon Modal */}
      <Suspense fallback={<>Loading</>}>
        <ManualCouponFetchModal
          open={showManualCouponFetchModal}
          onClose={() => setShowManualCouponFetchModal(false)}
          setPaymentId={setPaymentId}
          setLastManualSubmission={setLastManualSubmission}
        />
      </Suspense>

      {/* Golden Coupon Modal */}
      <Suspense fallback={<Loader />}>
        <SuperCouponModal
          open={!!couponData && !isCouponLoading} // Show only when coupon data is available and coupon is not loading (react query)
          onClose={() => {
            setPaymentId(''); // Reset payment ID
          }}
          couponCode={couponData?.coupon || ''}
          treeCount={selectedCount}
          paymentId={paymentId}
        />
      </Suspense>
    </Box>
  );
};

export default Home;
