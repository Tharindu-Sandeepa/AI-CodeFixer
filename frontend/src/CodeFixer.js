import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, InputAdornment, CircularProgress, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css'; // theme for the code 
import { green } from '@mui/material/colors';

const CodeFixer = () => {
  const [code, setCode] = useState('');
  const [fixedCode, setFixedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showPasteIcon, setShowPasteIcon] = useState(true);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    setCopied(false); 
  }, [fixedCode]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFixedCode('');

    try {
      const response = await axios.post('http://localhost:5002/api/fix-code', { code });

      // Remove unwanted characters
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

  // Paste from clipboard 
  const handlePasteClick = async () => {
    const text = await navigator.clipboard.readText();
    handleCodeChange({ target: { value: text } });
    setShowPasteIcon(false); 
  };

  // Highlight the code using pre tag modifications
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
        width: '100%',
        maxWidth: '800px',
        marginTop: '20px',
        position: 'relative', // Required for centering the loader
        minHeight: '400px', // Ensures that the loader is centered properly even with less content
      }}
    >
      {!fixedCode && (
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            textAlign: 'center',
            color: '#fff',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.6)',
            background: 'linear-gradient(90deg, #e43efe, #735dde, #6e25ff)', // Darker gradient colors
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '2px',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          AI Powered Code Fixer 
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%' ,marginTop:'60px'}}>
        <TextField
          multiline
          fullWidth
          rows={14}
          value={code}
          onChange={(e) => {
            handleCodeChange(e);
            if (e.target.value) setShowPasteIcon(false);
          }}
          placeholder="Simply paste any programming code into the designated area, and I will analyze it for errors. Once I detect any issues, I will provide you with a revised version of the code, complete with fixes and improvements.

Get started by pasting your code below, and let AI enhance your coding experience!"
          InputProps={{
            startAdornment: showPasteIcon && (
              <InputAdornment
                position="start"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  onClick={handlePasteClick}
                  sx={{
                    fontSize: '24px',
                    color: '#bbb',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <ContentPasteIcon sx={{ fontSize: '24px', color: '#bbb' }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              border: 'none',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },
          }}
          sx={{
            marginTop: 2,
          }} 
        />

        {!loading && (
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
          >
            Fix Code
          </Button>
        )}
      </form>

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Centering the loader
            zIndex: 10, // Ensures the loader is on top
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            size={120}
            thickness={3.5}
            sx={{
              color: '#6e25ff',
              animation: 'rotate 2s linear infinite', // Smooth spinning effect
            }}
          />
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize:'30px',
              color:'#735dde',
              marginTop: '20px',
              animation: 'fadeIn 1.5s ease-in-out infinite',
            }}
          >
            Fixing...
          </Typography>
        </Box>
      )}

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
          }}
        >
          <Typography variant="h8" gutterBottom sx={{ color: '#fff' }}>
            Fixed Code
          </Typography>

          <pre style={{ position: 'relative', maxWidth: '100%', overflowX: 'auto' }}>
            {/* Highlighted code display */}
            <code style={{ color: '#f8f8f2' }}>
              {fixedCode}
            </code>

            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <CopyToClipboard text={fixedCode} onCopy={handleCopy}>
                <IconButton aria-label="copy" sx={{ color: '#fff' }}>
                  {copied ? <CheckCircleIcon /> : <ContentCopyIcon />} {/* Conditional rendering */}
                </IconButton>
              </CopyToClipboard>
            </Box>
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default CodeFixer;