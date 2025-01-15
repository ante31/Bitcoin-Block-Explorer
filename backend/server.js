const express = require('express');
const appRouter = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(appRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
