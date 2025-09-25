import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Forest as ForestIcon } from '@mui/icons-material';
import Logo from './../../assets/images/logo.png';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
  ];

  const drawer = (
    <Box
      className="navigation-drawer-section bg-nature-light h-full"
      sx={{ textAlign: 'center' }}
    >
      <Box className="flex items-center justify-between p-2 border-b border-white/30">
        <Box className="flex items-center gap-2">
          <img src={Logo} alt="Super Green" className="h-7 w-5" />
          <Typography variant="h6" className="text-nature-primary font-bold">
            Super Green
          </Typography>
        </Box>
        <IconButton
          aria-label="close drawer"
          onClick={handleDrawerToggle}
          className="bg-transparent border border-white !bg-black rounded-full p-2 
                    hover:bg-white/10 transition-colors"
        >
          <CloseIcon fontSize="medium" className="text-white" />
        </IconButton>
      </Box>

      <List className="pt-8 !px-4">
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            className={`mb-2 rounded-lg transition-all duration-300 hover:bg-nature-secondary ${location.pathname === item.path ? 'bg-nature-primary text-white' : 'text-nature-dark bg-black bg-opacity-50'
              }`}
          >
            <ListItemText
              primary={item.text}
              className="text-center"
              primaryTypographyProps={{
                className: 'font-medium text-white'
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box className="absolute bottom-8 left-4 right-4">
        <Box className="card-nature text-center bg-[rgba(255,255,0,0.7)] bg-opacity-50">
          <ForestIcon className="text-nature-primary text-4xl mb-2 animate-leaf-sway" />
          <Typography variant="body2" className="text-nature-dark">
            🌱 Growing a greener tomorrow, one plant at a time
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        className="bg-white shadow-lg"
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
      >
        <Toolbar className="px-4 md:px-8">
          <Box className="flex items-center gap-3">
            <Link to="/">
              <img
                src={Logo}
                alt="Super Green"
                className="h-10 w-7.5 cursor-pointer"
              />
            </Link>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              className="text-nature-primary font-bold no-underline hover:text-nature-forest transition-colors duration-300 !font-minimal"
            >
              Super Green
            </Typography>
          </Box>

          <Box className="ml-auto">
            {!isMobile ? (
              <Box className="flex gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.text}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 no-underline font-medium ${location.pathname === item.path
                      ? 'bg-nature-primary text-white shadow-lg'
                      : 'text-nature-dark hover:bg-nature-light hover:text-nature-primary'
                      }`}
                  >
                    {item.text}
                  </Link>
                ))}
              </Box>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className="!text-nature-primary !hover:bg-nature-light transition-all duration-300"
              >
                <MenuIcon fontSize='large' />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            background: 'var(--nature-light)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;