import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tab, Tabs, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled Typography for glowing effect
const GlowingTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.8rem', 
  color: '#fff',
  textShadow: '0 0 8px rgba(255, 255, 255, 0.3), 0 0 16px rgba(255, 255, 255, 0.6)',
  letterSpacing: '2px',
  marginLeft: theme.spacing(2), 
}));

const AiAppBar = () => {
 
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(90deg, #e43efe, #735dde, #6e25ff)', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}
      >  
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <GlowingTypography variant="h6">
            AI-Buddy 2.0
          </GlowingTypography>
        </Box>

       
        <Box>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              marginRight: '10px', 
              '& .MuiTab-root': { 
                minWidth: 100,
                fontWeight: 'bold',
                fontSize: '1rem',
                letterSpacing: '1px',
              },
            }}
          >
            <Tab label="Code Fixer" />
            <Tab label="Summarizer" />
            <Tab label="Essay Generator" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AiAppBar;