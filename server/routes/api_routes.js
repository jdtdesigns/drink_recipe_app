const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send({
    message: 'hello from the server!'
  })
});

module.exports = router;