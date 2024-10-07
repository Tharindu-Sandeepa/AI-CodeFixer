import React from 'react';
import { Box, Typography } from '@mui/material';
import AiAppBar from './AiAppBar';
import CodeFixer from './CodeFixer'; 
function App() {
  return (
    <>
      <AiAppBar />
      <Box
        sx={{
          width: '100%', 
          minHeight: '100vh', 
          background: 'linear-gradient(to right, #ffe6f7, #d1c4e9, #b3e5fc)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative', 
        }}
      >
     
        <CodeFixer />
      </Box>
    </>
  );
}

export default App;