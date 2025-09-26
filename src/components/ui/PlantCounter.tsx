import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Fade,
  Grow
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Forest as ForestIcon,
  Payment as PaymentIcon,
  LocalFlorist as PlantIcon
} from '@mui/icons-material';

const MAXIMUM_TREE_COUNT = 10;

function calculatePrice(count: number) {
  return count * 99;
}

function calculateCO2(count: number) {
  return count * 48;
}

function getPlantDescription(count: number) {
  if (count === 1) return 'Plant one tree and start your green journey';
  if (count <= 5) return `Plant ${count} trees and multiply your green impact`;
  return `Create a mini forest with ${count} trees and make a lasting difference`;
}

interface PlantCounterProps {
  selectedCount: number;
  adjustCount: (increment: boolean) => void;
  onDonateClick: () => void;
}

const PlantCounter: React.FC<PlantCounterProps> = React.memo(
  ({ selectedCount, adjustCount, onDonateClick }) => {
    // render plant icons according to count of user selection
    const renderPlantIcons = (count: number) => {
      const displayCount = Math.min(count, MAXIMUM_TREE_COUNT);
      return (
        <Box className="flex flex-wrap justify-center gap-1 mb-4">
          {Array.from({ length: displayCount }, (_, i) => (
            <PlantIcon
              key={i}
              className="text-nature-primary animate-leaf-sway text-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
          {count > MAXIMUM_TREE_COUNT && (
            <Chip
              label={`+${count - MAXIMUM_TREE_COUNT} more`}
              size="small"
              className="bg-nature-secondary text-white"
            />
          )}
        </Box>
      );
    };

    return (
      <Grow in={true} timeout={800}>
        <Card className="plant-counter-section bg-white shadow-2xl border border-nature-light mb-8 !rounded-lg">
          <CardContent className="p-8">
            <Box className="text-center mb-6">
              <Typography variant="h5" className="text-white font-bold pb-4">
                Number of Trees
              </Typography>

              {/* Stylish Counter */}
              <Box className="flex items-center justify-center gap-6 mb-6">
                <Box
                  className="relative bg-nature-light rounded-full p-3 cursor-pointer hover:bg-nature-secondary hover:text-white transition-all duration-300 transform hover:scale-110"
                  onClick={() => adjustCount(false)}
                >
                  <RemoveIcon className="text-2xl" />
                  <Box className="absolute inset-0 bg-nature-gradient opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></Box>
                </Box>

                <Box className="relative">
                  <Box className="bg-nature-gradient p-8 rounded-2xl shadow-lg">
                    <Typography variant="h2" className="text-white font-bold min-w-[80px]">
                      {selectedCount}
                    </Typography>
                  </Box>
                  <Box className="absolute top-4 -right-6">
                    <ForestIcon className="text-nature-secondary animate-float text-3xl" />
                  </Box>
                </Box>

                <Box
                  className="relative bg-nature-light rounded-full p-3 cursor-pointer hover:bg-nature-secondary hover:text-white transition-all duration-300 transform hover:scale-110"
                  onClick={() => adjustCount(true)}
                >
                  <AddIcon className="text-2xl" />
                  <Box className="absolute inset-0 bg-nature-gradient opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></Box>
                </Box>
              </Box>

              {renderPlantIcons(selectedCount)}

              {/* Impact Info */}
              <Box className="mt-6 p-4 bg-white/10 backdrop-blur-sm shadow-2xl rounded-xl">
                <Typography variant="body1" className="text-white mb-3 !font-body">
                  {getPlantDescription(selectedCount)}
                </Typography>

                <Box className="flex justify-center gap-6 text-center">
                  <Box>
                    <Typography variant="h6" className="font-bold text-white">
                      ₹{calculatePrice(selectedCount)}
                    </Typography>
                    <Typography variant="body2" className="text-white">Total Cost</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" className="font-bold text-white">
                      {calculateCO2(selectedCount)} lbs
                    </Typography>
                    <Typography variant="body2" className="text-white">CO₂ Absorbed Annually</Typography>
                  </Box>
                </Box>

                <Fade in={true} timeout={1200}>
                  <Box className="text-center mt-8">
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PaymentIcon />}
                      onClick={onDonateClick}
                      className="bg-nature-primary hover:bg-nature-dark hover:text-white px-8 py-3 text-lg font-bold rounded-full transform hover:scale-105 transition-all duration-300 text-white"
                      sx={{
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        '&:hover': {
                          backgroundColor: '#1B5E20',
                          color: 'white'
                        }
                      }}
                    >
                      Donate {selectedCount} Tree{selectedCount > 1 ? 's' : ''}
                    </Button>
                  </Box>
                </Fade>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grow>
    );
  }
);

export default PlantCounter;
