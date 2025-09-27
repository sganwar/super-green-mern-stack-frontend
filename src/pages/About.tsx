import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Fade,
  Grow
} from '@mui/material';
import {
  LocalFlorist as LocalFloristIcon,
  Forest as ForestIcon,
  PublicOutlined as EarthIcon,
  GroupsOutlined as CommunityIcon,
  TrendingUpOutlined as GrowthIcon,
  FavoriteOutlined as HeartIcon
} from '@mui/icons-material';
import LogoFull from './../assets/images/logo-full.png';

const goals = [
  {
    icon: <LocalFloristIcon className="text-5xl text-nature-primary" />,
    title: "Reforestation",
    description: "Plant millions of trees to restore degraded ecosystems and combat climate change.",
    number: "10,000+"
  },
  {
    icon: <EarthIcon className="text-5xl text-nature-secondary" />,
    title: "Carbon Reduction",
    description: "Reduce atmospheric CO₂ by creating natural carbon sinks through strategic tree planting.",
    number: "500T"
  },
  {
    icon: <CommunityIcon className="text-5xl text-nature-forest" />,
    title: "Community Impact",
    description: "Engage local communities in environmental conservation and sustainable practices.",
    number: "50+"
  },
  {
    icon: <GrowthIcon className="text-5xl text-nature-moss" />,
    title: "Biodiversity",
    description: "Restore natural habitats to protect endangered species and promote biodiversity.",
    number: "100+"
  }
];

const quotes = [
  {
    text: "The Earth does not belong to us; we belong to the Earth. All things are connected like the blood that unites one family.",
    author: "Nature's Wisdom"
  },
  {
    text: "A society grows great when old men plant trees whose shade they know they shall never sit in.",
    author: "Ancient Proverb"
  },
  {
    text: "In every walk with nature, one receives far more than they seek.",
    author: "Conservation Truth"
  }
];

const About: React.FC = React.memo(() => {
  const { pathname } = useLocation(); //for handling scroll to top on page load

  // Scroll to top on component mount to avoid scroll position issues on new page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box className="about-page min-h-screen bg-gradient-to-br from-nature-light via-white to-nature-light">
      {/* Hero Section */}
      <Box className="relative overflow-hidden hero-section">
        <Box className="absolute inset-0 bg-forest-gradient opacity-10"></Box>
        <Container maxWidth="lg" className="relative py-16">
          <Box className="text-center space-y-6 flex flex flex-col items-center">
            <Fade in={true} timeout={1000}>
              <Typography
                variant="h2"
                className="text-gradient font-bold mb-4 !font-medium !font-display"
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                Our Green Mission
              </Typography>
            </Fade>

            <img
              src={LogoFull}
              alt="Super Green"
              // style={{width:'8rem'}}
              className="w-24 md:w-32 p-2 bg-white rounded-xl shadow-lg mb-4"
            />
            <Fade in={true} timeout={1500}>
              <Typography
                variant="h5"
                className="text-white mb-8 max-w-4xl mx-auto leading-relaxed text-center !font-body"
                sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
              >
                🌍 At Super Green NGO, we believe that every tree planted is a promise to future generations.
                We're not just growing forests; we're cultivating hope, nurturing life, and healing our planet
                one seed at a time.
              </Typography>
            </Fade>

            <Box className="flex justify-center">
              <ForestIcon className="text-8xl text-nature-primary animate-leaf-sway" />
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Hero Section ends */}

      <Container maxWidth="lg" className="py-16">
        {/* why we plant treee statement */}
        <Box className="text-center mb-16">
          <Typography variant="h4" className="text-nature-primary font-bold pb-4 !font-modern">
            Why We Plant Trees
          </Typography>

          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card className="h-full bg-leaf-gradient text-white shadow-2xl">
                <CardContent className="p-8">
                  <HeartIcon className="text-5xl mb-4" />
                  <Typography variant="h5" className="font-bold mb-4 !font-modern">
                    Our Vision
                  </Typography>
                  <Typography variant="body1" className="leading-relaxed !font-minimal">
                    To create a world where every community has access to clean air, where forests thrive,
                    and where the next generation inherits a planet that's greener than the one we found.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card className="h-full bg-nature-gradient text-white shadow-2xl">
                <CardContent className="p-8">
                  <LocalFloristIcon className="text-5xl mb-4" />
                  <Typography variant="h5" className="font-bold mb-4 !font-modern">
                    Our Mission
                  </Typography>
                  <Typography variant="body1" className="leading-relaxed !font-minimal">
                    To mobilize communities, corporations, and individuals in the largest reforestation
                    initiative, focusing on native species that restore ecosystems and combat climate change.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* why we plant treee statement */}

        {/* Goals Section commented */}
        <Box className="mb-16 hidden xl:block">
          <Typography variant="h4" className="text-nature-primary font-bold text-center pb-4 !font-modern">
            Our Impact Goals
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {goals.map((goal, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index} className="w-full md:w-2/5">
                <Grow in={true} timeout={1000 + index * 200}>
                  <Card className="h-full text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <Box
                        className="mb-4 animate-float"
                        style={{ animationDelay: `${index * 500}ms` }}
                      >
                        {goal.icon}
                      </Box>

                      <Typography
                        variant="h3"
                        className="text-primary font-bold mb-2 truncate"
                      >
                        {goal.number}
                      </Typography>

                      <Typography
                        variant="h6"
                        className="text-dark font-semibold mb-3 truncate"
                      >
                        {goal.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        className="text-muted leading-relaxed break-words !font-minimal"
                        style={{ wordBreak: 'break-word' }}
                      >
                        {goal.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* Goals Section ends*/}

        {/* Inspirational Quotes */}
        <Box className="mb-16">
          <Typography variant="h4" className="text-nature-primary font-bold text-center pb-4 !font-modern">
            Words That Inspire Us
          </Typography>

          <Grid container spacing={1} justifyContent={'center'} sx={{ flexDirection: { xs: 'column' } }}>
            {quotes.map((quote, index) => (
              <Grid size={{ xs: 12, md: 12 }} key={index}>
                <Fade in={true} timeout={1500 + index * 300}>
                  <Card className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-nature-primary">
                    <CardContent className="p-8">
                      <Typography variant="body1" className="text-nature-dark italic mb-4 leading-relaxed text-lg">
                        "{quote.text}"
                      </Typography>
                      <Typography variant="subtitle1" className="text-nature-primary font-semibold text-right">
                        — {quote.author}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* Inspirational Quotes end */}

        {/* Call to Action */}
        <Box className="join-us-section text-center bg-nature-gradient py-8 px-6 rounded-2xl text-white shadow-2xl flex flex-col items-center">
          <Typography variant="h4" className="font-bold pb-6">
            Join Our Green Revolution
          </Typography>

          <Typography variant="h6" className="mb-8 max-w-3xl mx-auto leading-relaxed !font-body">
            🌱 Every contribution matters. Every tree counts. Every action creates a ripple effect
            that can transform our world. Together, we can make Earth greener, cleaner, and more beautiful
            for generations to come.
          </Typography>

          <Box className="flex justify-center gap-4 md:gap-8 mb-6 flex-col sm:flex-row">
            <Box className="text-center">
              <Typography variant="h4" className="font-bold">500+</Typography>
              <Typography variant="body1">Trees Planted</Typography>
            </Box>
            <Box className="text-center">
              <Typography variant="h4" className="font-bold">50+</Typography>
              <Typography variant="body1">Communities Served</Typography>
            </Box>
            <Box className="text-center">
              <Typography variant="h4" className="font-bold">1000+</Typography>
              <Typography variant="body1">Lives Impacted</Typography>
            </Box>
          </Box>

          <Typography variant="h5" className="hidden sm:block font-medium !text-xl md:!text-2xl !font-minimal">
            🌿 Plant Hope. Grow Dreams. Nurture Tomorrow. 🌿
          </Typography>
        </Box>
        {/* Call to Action end*/}
      </Container>


    </Box>
  );
});

export default About;