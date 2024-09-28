const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS for the frontend
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Endpoint to fix code
app.post('/api/fix-code', async (req, res) => {
    const { code } = req.body;

    const prompt = `Fix the following code for errors. just give the code. dont explain . dont change the logics:\n\n${code}`;

    try {
        const result = await model.generateContent(prompt);
        res.json({ fixedCode: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: 'Error fixing the code' });
    }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});