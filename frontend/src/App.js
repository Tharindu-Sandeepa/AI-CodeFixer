import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography,InputAdornment, CircularProgress, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css'; // VS Code-like theme
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function App() {
  const [code, setCode] = useState('');
  const [fixedCode, setFixedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showPasteIcon, setShowPasteIcon] = useState(true);

  // Handle code input change
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Handle form submit and make API call to fix code
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFixedCode('');

    try {
      const response = await axios.post('http://localhost:5002/api/fix-code', { code });

      // Remove any backticks (```), language tags, or unwanted characters
      const sanitizedCode = response.data.fixedCode
      .replace(/```[\s\S]*?\n/g, '')  // Remove opening code blocks and language labels
      .replace(/^\s*[\w-]+\n/, '')    // Remove language labels like "sql"
      .replace(/```\s*$/, '')         // Remove closing triple backticks
      .trim();                        // Remove leading/trailing spaces
      setFixedCode(sanitizedCode);
    } catch (err) {
      setError('Failed to fix the code.');
    } finally {
      setLoading(false);
    }
  };
  

   // Paste from clipboard when the user clicks the paste icon
   const handlePasteClick = async () => {
    const text = await navigator.clipboard.readText();
    handleCodeChange({ target: { value: text } });
    setShowPasteIcon(false); // Hide the paste icon once user pastes the code
  };

  // Highlight the code after it's fixed
  useEffect(() => {
    if (fixedCode) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [fixedCode]);

  return (
    <Box 
      sx={{
        p: 4,
        maxWidth: '100%',
        minHeight: '110vh',
        margin: '0 auto',
        background: 'linear-gradient(to right, #ffe6f7, #d1c4e9, #b3e5fc)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative' 
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        AI-Powered Code Fixer
      </Typography>

      {/* Input form for code */}
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px' }} >
      <TextField
        multiline
        fullWidth
        rows={14}
        value={code}
        onChange={(e) => {
          handleCodeChange(e);
          if (e.target.value) setShowPasteIcon(false); // Hide the paste icon when the user starts typing
        }}
        placeholder="Paste your code here"
        InputProps={{
          startAdornment: showPasteIcon && (
            <InputAdornment
  position="start"
  sx={{
    display: 'flex',           // Ensures the contents (IconButton) are flex items
    alignItems: 'center',       // Vertically centers the IconButton
    justifyContent: 'center',   // Horizontally centers the IconButton
                // Ensures it takes the full width of the input field
  }}
>
  <IconButton
    onClick={handlePasteClick}
    sx={{ 
      fontSize: '24px',          // Icon size
      color: '#bbb',             // Icon color
      width: '100%',             // IconButton full width
      justifyContent: 'center',  // Center the icon horizontally
    }}
  >
    <ContentPasteIcon sx={{ fontSize: '24px', color: '#bbb' }} />
  </IconButton>
</InputAdornment>
          ),
          sx: {
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for modern look
            backdropFilter: 'blur(10px)', // Blur for depth
            borderRadius: '16px', // Rounded corners
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
            border: 'none', // Remove border for a clean look
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)', // Slightly larger shadow on hover
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Ensure no outline on focus
            },
          },
        }}
        sx={{
          marginTop: 2,
        }}
      />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            width: '100%',
            background: 'linear-gradient(to right, #ff6fd8, #735dde)',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 48,
            position: 'relative',
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ color: '#fff', position: 'absolute' }} />
              <span style={{ opacity: 0 }}>Thinking...</span>
            </>
          ) : (
            'Fix Code'
          )}
        </Button>
      </form>

      {/* Display result */}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {fixedCode && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 2,
            position: 'relative',
            background: '#282a36',
            borderRadius: 2,
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
            Fixed Code:
          </Typography>

          <pre style={{ position: 'relative', maxWidth: '100%', overflowX: 'auto' }}>
            {/* Highlighted code display */}
            <code style={{ color: '#f8f8f2' }}>
              {fixedCode}
            </code>
            {/* Show copy button */}
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <CopyToClipboard text={fixedCode} onCopy={() => setCopied(true)}>
                <IconButton aria-label="copy" sx={{ color: '#fff' }}>
                  <ContentCopyIcon />
                </IconButton>
              </CopyToClipboard>
            </Box>
          </pre>
        </Paper>
      )}
    </Box>
  );
}

export default App;