const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/', apiController.geolocation, apiController.yelp, (req, res) => {
  res.status(200).json(res.locals.businesses);
});

router.get('/favorite/:venue_id', apiController.fetch, (req, res) => {
  res.status(200).json({
    business: res.locals.business
  })
})

module.exports = router;
