const {send} = require('micro');
const pgController = require('./pgController.js');

module.exports = async (req, res) => {
  let statusCode;
  const query = await pgController.latest(10);

  if (query === null) {
    statusCode = 500;
    const data = {error: 'database request failed'};
    send(res, statusCode, data = null);
  }

  const headlines = {
    data: [
      {title: 'itemOne'},
      {title: 'itemTwo'}
    ]
  };
  statusCode = 200;
  send(res, statusCode, data = query);
}