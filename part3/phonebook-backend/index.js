const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3001

app.use(express.json());
app.use(morgan());



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})