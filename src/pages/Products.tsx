import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Rating,
  Fade,
  Grow
} from '@mui/material';
import {
  Download as DownloadIcon,
  Star as StarIcon,
  Category as CategoryIcon,
  Storage as StorageIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  Shop as ShopIcon,
} from '@mui/icons-material';

// Product Data Array - Easy to modify/add products
const PRODUCTS = [
  {
    id: 1,
    name: 'Super I',
    category: 'Educational',
    description: 'An innovative educational app designed to enhance learning experiences through interactive content and gamified lessons.',
    downloads: '1k+',
    rating: 4.9,
    size: '209 MB',
    ageRating: '3+',
    icon: 'https://play-lh.googleusercontent.com/dYry3LkJLIU--2oPBTPCqlmdng_KesU7QjXaoTL1PF2rH3UVTEsUwZi7LiDW62rx_d3E',
    bgGradient: 'from-blue-500 to-indigo-600',
    accentColor: 'bg-blue-500',
    productLink:'https://play.google.com/store/apps/details?id=com.superchild.sc365&pcampaignid=web_share'
  },
  {
    id: 2,
    name: 'Super Gold',
    category: 'Casual',
    description: 'A fun and engaging casual game that brings entertainment and excitement with stunning graphics and smooth gameplay.',
    downloads: '100+',
    rating: 5.0,
    size: '171 MB',
    ageRating: '3+',
    icon: 'https://play-lh.googleusercontent.com/2DSdj_rZAwkupq0NSrEUkfgwskLhTcl07tEYtHiJ6ZkJH5DO_u-G239n2Jx2vDZGnU1f',
    bgGradient: 'from-amber-400 to-yellow-600',
    accentColor: 'bg-yellow-500',
    productLink:'https://play.google.com/store/apps/details?id=com.superbillionaire.game&pcampaignid=web_share',
  }
];

const Products: React.FC = () => {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Hero Section */}
      <Box className="relative overflow-hidden bg-gradient-to-r from-nature-primary via-nature-forest to-nature-secondary text-white py-20">
        <Container maxWidth="lg" className="relative z-10">
          <Fade in={true} timeout={1500}>
            <Box className="text-center space-y-4 flex flex-col items-center">
              <Typography
                variant="h2"
                className="text-white !font-medium mb-4 !font-display" 
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                Our Products
              </Typography>
              <Typography
                variant="h5"
                className="mb-6 opacity-90 !font-bold max-w-3xl mx-auto !font-body"
                sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
              >
                From the house of <span className="font-bolder">Super Child</span>
              </Typography>
              <Typography variant="h6" className="text-white max-w-3xl mx-auto text-center text-xl md:text-2xl !font-body">
                Discover our collection of innovative mobile applications designed to educate, entertain, and enhance your digital experience.
              </Typography>
            </Box>
          </Fade>

          {/* Floating Background Elements */}
          <Box className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            {Array.from({ length: 15 }, (_, i) => (
              <Box
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                <CategoryIcon sx={{ fontSize: Math.random() * 30 + 20, color: 'white' }} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Products Section */}
      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={4}>
          {PRODUCTS.map((product, index) => (
            <Grid size={{xs:12,md:6}} key={product.id}>
              <Grow in={true} timeout={800 + index * 200}>
                <Card 
                  className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  sx={{ borderRadius: '24px', overflow: 'hidden' }}
                >
                  {/* Card Header with Gradient */}
                  <Box className={`bg-gradient-to-r ${product.bgGradient} p-6 text-white`}>
                    <Box className="flex items-center gap-4 mb-4">
                      <Box className="w-20 h-20 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center">
                        <img 
                          src={product.icon} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </Box>
                      <Box className="flex-1">
                        <Typography variant="h5" className="font-bold mb-1">
                          {product.name}
                        </Typography>
                        <Chip
                          icon={<CategoryIcon className="text-white" />}
                          label={product.category}
                          className="!bg-white bg-opacity-20 text-white border-white border-opacity-30"
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <CardContent className="p-6">
                    {/* Description */}
                    <Typography variant="body1" className="text-gray-700 mb-6 leading-relaxed">
                      {product.description}
                    </Typography>

                    {/* Stats Grid */}
                    <Box className="grid grid-cols-2 gap-4 mb-6">
                      {/* Downloads */}
                      <Box className="bg-gray-50 rounded-xl p-4 text-center">
                        <DownloadIcon className="text-nature-primary text-3xl mb-2" />
                        <Typography variant="h6" className="font-bold text-gray-800">
                          {product.downloads}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Downloads
                        </Typography>
                      </Box>

                      {/* Rating */}
                      <Box className="bg-gray-50 rounded-xl p-4 text-center">
                        <Box className="flex justify-center mb-2">
                          <Rating 
                            value={product.rating} 
                            precision={0.1} 
                            readOnly 
                            size="small"
                          />
                        </Box>
                        <Typography variant="h6" className="font-bold text-gray-800">
                          {product.rating}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Rating
                        </Typography>
                      </Box>

                      {/* Size */}
                      <Box className="bg-gray-50 rounded-xl p-4 text-center">
                        <StorageIcon className="text-nature-secondary text-3xl mb-2" />
                        <Typography variant="h6" className="font-bold text-gray-800">
                          {product.size}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          App Size
                        </Typography>
                      </Box>

                      {/* Age Rating */}
                      <Box className="bg-gray-50 rounded-xl p-4 text-center">
                        <ShieldIcon className="text-nature-forest text-3xl mb-2" />
                        <Typography variant="h6" className="font-bold text-gray-800">
                          {product.ageRating}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Age Rating
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Button */}
                    <Button
                    onClick={() => window.open(product.productLink, '_blank')}
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<DownloadIcon />}
                      endIcon={<ShopIcon />}
                      className={`${product.accentColor} text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                    >
                      Download on Google Play
                    </Button>
                  </CardContent>

                  {/* Bottom Badge */}
                  <Box className={`bg-gradient-to-r ${product.bgGradient} py-3 px-6 flex items-center justify-center gap-2`}>
                    <TrendingUpIcon className="text-white" />
                    <Typography variant="body2" className="text-white font-medium">
                      Trending in {product.category}
                    </Typography>
                  </Box>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Additional Info Section */}
        <Fade in={true} timeout={1500}>
          <Box className="mt-16 text-center">
            <Card 
              className="max-w-4xl mx-auto bg-gradient-to-br from-nature-light to-white border border-nature-secondary border-opacity-30"
              sx={{ borderRadius: '24px', overflow: 'hidden' }}
            >
              <CardContent className="p-8">
                <Typography variant="h5" className="font-bold mb-4 text-nature-primary">
                  Why Choose Our Apps?
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <Box className="text-center">
                    <Box className="w-16 h-16 bg-nature-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                      <ShieldIcon className="text-white text-3xl" />
                    </Box>
                    <Typography variant="h6" className="font-bold mb-2">
                      Safe & Secure
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      All our apps are thoroughly tested and verified for security
                    </Typography>
                  </Box>
                  <Box className="text-center">
                    <Box className="w-16 h-16 bg-nature-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                      <StarIcon className="text-white text-3xl" />
                    </Box>
                    <Typography variant="h6" className="font-bold mb-2">
                      Highly Rated
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Top ratings from thousands of satisfied users worldwide
                    </Typography>
                  </Box>
                  <Box className="text-center">
                    <Box className="w-16 h-16 bg-nature-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                      <TrendingUpIcon className="text-white text-3xl" />
                    </Box>
                    <Typography variant="h6" className="font-bold mb-2">
                      Regular Updates
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Continuous improvements and new features added regularly
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Products;