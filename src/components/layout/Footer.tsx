import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { Forest as ForestIcon } from '@mui/icons-material';
import Logo from './../../assets/images/logo.png';

const Footer: React.FC = () => {

  return (
    <Box component="footer" className="bg-nature-gradient text-white mt-auto">
      <Container maxWidth="lg" className="py-4 md:py-6 flex flex-col items-center gap-2">

        {/* Logo + Brand */}
        <Box className="flex items-center gap-0">
          <img src={Logo} alt="Super Green" className="h-13 w-11" />
          <Typography variant="h4" className="font-bold tracking-wide !font-modern">
            uper Green
          </Typography>
        </Box>

        {/* Tagline */}
        <Typography
          variant="body1"
          className="text-nature-light text-center max-w-xl leading-relaxed !font-body"
        >
          Growing a sustainable future-one plant at a time.
        </Typography>

        {/* Divider */}
        <Box className="h-px w-16 bg-nature-secondary opacity-100"></Box>

        {/* Bottom Row */}
        <Box className="flex flex-col md:flex-row gap-4 items-center text-nature-light text-sm">
          <Typography variant="body2">
            © 2025 Super Green. All rights reserved.
          </Typography>

          <Box className="hidden md:block h-4 w-px bg-nature-secondary/40"></Box>

          <Link
            href="https://www.instagram.com/mohammed_anwar_abbas"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            className="group flex items-center gap-2 rounded-md bg-gray-200 border border-transparent px-3 py-1 transition-colors hover:bg-white"
          >
            <ForestIcon
              fontSize="small"
              className="text-gray-800 transition-colors group-hover:text-nature-primary"
            />
            <Typography
              variant="body2"
              className="font-medium text-gray-800 transition-colors group-hover:text-nature-primary !font-accent"
            >
              Built by Anwar
            </Typography>
          </Link>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
