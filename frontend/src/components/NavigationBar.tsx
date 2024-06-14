// src/components/NavigationBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Autonomous Drive Evaluation
        </Typography>
        <IconButton color="inherit">
          <DirectionsCarIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;