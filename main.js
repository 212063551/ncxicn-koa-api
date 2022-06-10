const app = require('./bin/www');
const { PORT } = require('./config/config');

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`http server url : http://localhost:${port}`);
});
