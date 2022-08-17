const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down....');
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, // MAY NEED TO REMOVE
  })
  .then(() => console.log('DB connection succesful!'));

const port = process.env.PORT || 3000;
const app = require('./app');

const server = app.listen(port, () => {
  console.log(`Listening on port 3000`);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION!');
  process.exit(1);
});

// module.exports = DB;
