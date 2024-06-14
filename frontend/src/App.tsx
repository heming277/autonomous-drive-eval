import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Dashboard />
      </Container>
    </>
  );
};

export default App;