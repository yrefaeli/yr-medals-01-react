const express = require('express');
const cors = require('cors');
const path = require('path');
const medals = require(path.resolve(__dirname, 'medals.json'));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const errorMode = process.argv.includes('--error');

app.get('/medals', (req, res) => {
  return errorMode
    ? res.status(500).json({ error: 'Simulated server error' })
    : res.json(medals);
});

app.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
  console.log(`Running in ${errorMode ? 'Error' : 'Normal'} mode`);
});
