const {send} = require('micro');

module.exports = async (req, res) => {
  res.end('running');
}