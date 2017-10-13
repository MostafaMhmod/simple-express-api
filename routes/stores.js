const express = require('express');
const router = express.Router();
const Store = require('../models/store');


// get an instance of the router for api routes
var apiRoutes = router;


// Home Endpoint
apiRoutes.get('/', (req, res, next) => {
  res.send('Invalid Endpoint, Try a different one ');
});

// Home Endpoint
apiRoutes.post('/createstore', (req, res, next) => {
  if (req.body.name === undefined || req.body.address === undefined || req.body.logoPath === undefined)
    return res.json({ success: false, msg: 'Error in store creation' })
  else {
    let newStore = new Store({
      name: req.body.name,
      address: req.body.address,
      logoPath: req.body.logoPath
    })

    Store.addStore(newStore)

    return res.json({ success: true, msg: 'Store Created', newStore });

  }
});


// viewStores Endpoint
apiRoutes.get('/viewStores', (req, res, next) => {
  Store.find({}, function (err, stores) {
    let storeMap = [];

    stores.forEach(function (store) {
      storeMap.push(store.name)
    });

    res.send(storeMap);
  });

});


// viewStore Endpoint
apiRoutes.get('/viewStores/:id', (req, res, next) => {
  // console.log(req.params);
  Store.getUserById(req.params.id, (err, store) => {
    if (store)
      return res.json({ success: true, msg: 'Store Found', store });

    if (err | !store) {
      return res.json({ success: false, msg: 'Store not found' });
    }
  });
});


// updateStore Endpoint
apiRoutes.put('/updateStore/:id', (req, res, next) => {
  if (req.body.name === undefined || req.body.address === undefined || req.body.logoPath === undefined)
    return res.json({ success: false, msg: 'You Must Enter all the data for the request body' })

  Store.findOneAndUpdate({ "_id": req.params.id },
    {
      $set:
      {
        name: req.body.name,
        address: req.body.address,
        logoPath: req.body.logoPath
      }
    },
    { new: true },
    (err, user) => {
      if (err)
        return res.json({ message: "Error in updating the store!" });
      else {
        return res.json({ success: "true", message: "Store Updated" });
      }
    })
});

module.exports = apiRoutes;
