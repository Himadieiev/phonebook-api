const app = require('./app');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(5000, () => {
      console.log('Server running. Use our API on port: 5000');
    });
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
