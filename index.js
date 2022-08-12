const app = require('./src/api/app');

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
  console.log('localhost:3001/');
});
