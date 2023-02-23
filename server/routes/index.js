const router = require('express').Router();
const apiRoutes = require('./api');


router.use('/api', apiRoutes);
router.use((req, res) => { //This serves as a fallback mechanism to catch any requests made to undefined routes and return a meaningful response to the client, rather than just returning a 404 error.
    return res.send('Wrong route!');
  });


  module.exports = router; 