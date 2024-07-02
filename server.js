const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({ filename: req.file.filename });
});

app.post('/submit-new-prompt', (req, res) => {
  const { filePath, prompt } = req.body;
  // Handle new prompt submission logic here
  res.status(200).send({ message: 'Prompt received and processed.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
