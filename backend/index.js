const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const patientsRouter = require('./routes/patients');
const prescriptionsRouter = require('./routes/prescriptions');

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientsRouter);
app.use('/api/prescriptions', prescriptionsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Apotheca AI Backend Service',
    status: 'running',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
