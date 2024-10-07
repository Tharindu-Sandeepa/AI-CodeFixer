
# AI Powered Code Fixer

## Overview

The **AI Powered Code Fixer** is a web-based application that allows users to paste or input any programming code and get it analyzed for errors and improvements. The app uses AI to detect errors in the code, fixes them, and provides a revised version. It's a powerful tool for developers looking to enhance their code quality quickly and efficiently.

## Features

- Paste or type programming code for analysis.
- AI-powered error detection and code fixing.
- Real-time feedback with a loading animation during AI processing.
- Copy the fixed code to the clipboard.
- Responsive UI with visually appealing design.
- Highlighted code syntax using the **Monokai** theme for easy readability.
- Option to paste code directly from the clipboard.
- Progressive loading animation for user experience improvement.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Material UI**: UI component library for React to create beautiful and consistent layouts.
- **Axios**: HTTP client for making API requests to the backend.
- **Highlight.js**: Syntax highlighting for the code.
- **Node.js & Express.js**: (In backend) For serving the API that processes and fixes the code using AI models.
- **MUI Icons**: Icons for visual cues like copy/paste buttons.
- **Clipboard API**: For handling clipboard operations such as copy and paste.
- **CSS (Monokai Theme)**: For syntax highlighting of code blocks.

## Installation

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-powered-code-fixer.git
   ```

2. Navigate into the project directory:

   ```bash
   cd ai-powered-code-fixer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3000`.

### Backend (Optional)

If you need the backend to run on your local machine:

1. Set up a Node.js/Express.js backend server that handles the `/fix-code` API route. You can integrate any AI model (e.g., GPT) to process the code.

2. Make sure the backend is running on `http://localhost:5002` or update the frontend API URL if needed.

## Usage

1. Paste your code in the text field or use the clipboard paste functionality.
2. Click on the **Fix Code** button to send the code for AI analysis and fixing.
3. The app will show a loading animation until the AI processes the code.
4. Once the code is fixed, it will be displayed in a highlighted format.
5. Copy the fixed code to your clipboard using the copy button.


### Screenshots
