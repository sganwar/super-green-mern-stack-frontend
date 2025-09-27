import React, { useState, useEffect, memo } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Fade,
  Zoom
} from '@mui/material';
import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  CelebrationOutlined as CelebrationIcon,
  StarOutlined as StarIcon
} from '@mui/icons-material';

interface SuperCouponModalProps {
  open: boolean;
  onClose: () => void;
  couponCode: string;
  treeCount: number;
  paymentId?: string;
}

const SuperCouponModal: React.FC<SuperCouponModalProps> = memo(({
  open,
  onClose,
  couponCode,
  treeCount,
  paymentId
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShowCelebration(true), 500);
    } else {
      setShowCelebration(false);
    }
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateSparkles = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <Box
        key={i}
        className="absolute animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 100}ms`,
          animationDuration: `${2 + Math.random()}s`
        }}
      >
        <StarIcon
          className="text-yellow-400 opacity-70"
          style={{ fontSize: Math.random() * 20 + 10 }}
        />
      </Box>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'transparent',
          boxShadow: 'none',
          overflow: 'visible',
          maxHeight: { xs: '90vh', sm: 'none' },
          margin: { xs: 1, sm: 3 }
        }
      }}
    >
      <DialogContent className="p-0 relative" sx={{ p: { xs: 1, sm: 0 } }}>
        {/* Celebration Animation Background */}
        <Box className="absolute inset-0 pointer-events-none overflow-hidden">
          {showCelebration && generateSparkles()}
        </Box>

        {/* Close Button */}
        <Box className="absolute top-2 right-2 z-50" sx={{ top: { xs: 8, sm: 8 }, right: { xs: 8, sm: 8 } }}>
          <IconButton
            onClick={onClose}
            className="bg-white shadow-lg"
            sx={{
              backgroundColor: 'white',
              color: '#2E7D32',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Celebration Header */}
        <Zoom in={showCelebration} timeout={800}>
          <Box className="text-center mb-4" sx={{ mb: { xs: 2, sm: 6 }, pt: { xs: 4, sm: 8 } }}>
            <CelebrationIcon
              className="text-4xl text-yellow-500 animate-bounce mb-2"
              sx={{ fontSize: { xs: '3rem', sm: '4rem' } }}
            />
            <Typography variant="h5" className="text-white font-bold mb-1" sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
              🎉 Payment Successful! 🎉
            </Typography>
            <Typography variant="body1" className="text-white opacity-90" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
              Thank you for planting {treeCount} tree{treeCount > 1 ? 's' : ''}!
            </Typography>
          </Box>
        </Zoom>

        {/* Golden Ticket */}
        <Fade in={showCelebration} timeout={1200}>
          <Box className="relative mx-auto" sx={{ maxWidth: { xs: '280px', sm: '400px' } }}>
            {/* Golden Ticket Card */}
            <Box
              className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              sx={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
                boxShadow: '0 20px 40px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              {/* Shimmering Effect */}
              <Box
                className="absolute inset-0 rounded-2xl animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  backgroundSize: '200% 100%'
                }}
              />

              {/* Ticket Content */}
              <Box className="relative p-4 text-center" sx={{ p: { xs: 4, sm: 8 } }}>
                {/* Header */}
                <Typography
                  variant="h6"
                  className="font-bold text-yellow-900 mb-2 tracking-wider"
                  sx={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    fontSize: { xs: '1.1rem', sm: '1.5rem' }
                  }}
                >
                  GOLDEN TICKET
                </Typography>

                <Typography variant="body2" className="text-yellow-800 mb-4" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                  Thanks for planting a tree!
                </Typography>

                {/* Coupon Code Section */}
                <Box className="bg-yellow-800 bg-opacity-20 rounded-xl p-3 mb-3 border-2 border-yellow-700 border-dashed" sx={{ p: { xs: 2, sm: 4 } }}>
                  <Typography
                    variant="h4"
                    className="font-mono font-bold text-yellow-900 mb-2 tracking-widest"
                    sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem' } }}
                  >
                    {couponCode}
                  </Typography>

                  <Button
                    onClick={handleCopy}
                    startIcon={<CopyIcon />}
                    variant="contained"
                    size="small"
                    className={`${copied ? 'bg-green-600' : 'bg-yellow-700'} hover:bg-yellow-800 text-white font-medium`}
                    sx={{ textTransform: 'none', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </Button>
                </Box>

                {/* Payment ID Section */}
                {paymentId && (
                  <Box className="bg-yellow-900 bg-opacity-30 rounded-lg p-2 mb-3">
                    <Typography variant="caption" className="text-yellow-800 block mb-1">
                      Payment ID
                    </Typography>
                    <Typography variant="body2" className="text-yellow-900 font-mono text-xs">
                      {paymentId}
                    </Typography>
                  </Box>
                )}

                {/* Decorative Elements */}
                <Box className="flex justify-between items-center text-yellow-700">
                  <StarIcon className="text-lg animate-pulse" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />
                  <Typography variant="body2" className="font-medium" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' } }}>
                    Your Token of Gratitude
                  </Typography>
                  <StarIcon className="text-lg animate-pulse" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} style={{ animationDelay: '0.5s' }} />
                </Box>
              </Box>

              {/* Decorative Corners */}
              <Box className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-yellow-700 rounded-tl-lg" sx={{ width: { xs: 8, sm: 16 }, height: { xs: 8, sm: 16 } }} />
              <Box className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-yellow-700 rounded-tr-lg" sx={{ width: { xs: 8, sm: 16 }, height: { xs: 8, sm: 16 } }} />
              <Box className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-yellow-700 rounded-bl-lg" sx={{ width: { xs: 8, sm: 16 }, height: { xs: 8, sm: 16 } }} />
              <Box className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-yellow-700 rounded-br-lg" sx={{ width: { xs: 8, sm: 16 }, height: { xs: 8, sm: 16 } }} />
            </Box>

            {/* Shadow Effect */}
            <Box
              className="absolute inset-0 bg-yellow-600 rounded-2xl -z-10 transform translate-y-2 translate-x-1"
              style={{ filter: 'blur(8px)', opacity: 0.3 }}
            />
          </Box>
        </Fade>

        {/* Thank You Message */}
        <Fade in={showCelebration} timeout={1800}>
          <Box className="text-center mt-4 mb-2" sx={{ mt: { xs: 3, sm: 8 }, mb: { xs: 2, sm: 4 } }}>
            <Typography variant="h6" className="text-white font-medium mb-2" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              🌱 Your trees will be planted soon! 🌱
            </Typography>

            <Box className="flex justify-center gap-4 text-white text-sm opacity-80">
              <Box className="text-center">
                <Typography variant="body2" className="font-bold" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>🌍</Typography>
                <Typography variant="caption" sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>Cleaner Air</Typography>
              </Box>
              <Box className="text-center">
                <Typography variant="body2" className="font-bold" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>🌳</Typography>
                <Typography variant="caption" sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>Greener Earth</Typography>
              </Box>
              <Box className="text-center">
                <Typography variant="body2" className="font-bold" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>💚</Typography>
                <Typography variant="caption" sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>Better Future</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Gradient Background */}
        <Box
          className="absolute inset-0 -z-20 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #4CAF50 100%)',
            filter: 'blur(1px)'
          }}
        />
      </DialogContent>
    </Dialog>
  );
});

export default SuperCouponModal;