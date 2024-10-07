import React from 'react';
import { Box, Typography } from '@mui/material';
import AiAppBar from './AiAppBar';
import CodeFixer from './CodeFixer'; // Import the CodeFixer component

function App() {
  return (
    <>
      <AiAppBar />
      <Box
        sx={{
          width: '100%', // Full viewport width
          minHeight: '100vh', // Minimum height of the viewport, but can expand
          background: 'linear-gradient(to right, #ffe6f7, #d1c4e9, #b3e5fc)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative', // Relative positioning so the content can flow normally
          padding: '20px', // Optional: Add padding to the content inside the Box
        }}
      >
        {/* <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          AI-Powered Code Fixer
        </Typography> */}
        
        {/* Include the CodeFixer component */}
        <CodeFixer />
      </Box>
    </>
  );
}

export default App;