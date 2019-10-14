const passport = require('passport');
const express = require('express');
const fs = require('fs');
const sharp = require('sharp');
const User = require('../models/User');
const Product = require('../models/Product.js');
const auth = require('./auth');

const router = express.Router();

router.post('/registration', async (req, res, next) => {
  console.log('registering user');
  const { username, password } = req.body;
  const newUser = new User({ username });
  User.register(newUser, password, (e) => {
    if (e) {
      res.send('false');
    } else {
      fs.mkdir(`./backend/public/${username}/tmb`, { recursive: true }, (err) => {
        console.log(err);
      });
      console.log('user registered!');
      res.send('true');
    }
  });
});
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(`User ${req.session.passport.user} loged in`);
  res.send(req.user);
});
router.post('/logout', auth, (req, res) => {
  req.logout();
  console.log(`User ${req.session.passport.user} loged out`);
  req.session.destroy();

  res.send(true);
});
router.post('/user', auth, (req, res) => {
  console.log(`User ${req.session.passport.user} loged in`);
  res.send(req.user);
});
router.get('/products/my', auth, async (req, res) => {
  const { _id } = req.user;
  const products = await Product.find({ user: _id });
  res.json(products);
});
router.get('/products', auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
router.post('/products', auth, async (req, res) => {
  const data = JSON.parse(req.body.data);
  const image = req.files[data.fileName];
  const { _id, username } = req.user;
  const imageName = data.fileName.slice(0, data.fileName.lastIndexOf('.'));
  const imageFormat = data.fileName.slice(data.fileName.lastIndexOf('.') + 1);
  const imagePath = `/${username}/${image.name}`;
  const tmbPath = `/${username}/tmb/${imageName}-tmb.${imageFormat}`;
  await image.mv(`./public${imagePath}`);
  sharp(image.data)
    .resize(200, 200, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(`./public/${tmbPath}`);
  const newProduct = new Product({
    tag: data.tag,
    user: _id,
    startDate: data.startDate,
    endDate: data.endDate,
    description: data.description,
    src: imagePath,
    tmb_src: tmbPath,
    startPrice: data.price,
    stakeHistory: [{ user: username, stake: data.price }],
  });
  await newProduct.save();
  res.json('success');
});
router.delete('/products', auth, async (req, res) => {
  const { id } = req.query;
  await Product.findByIdAndDelete(id);
  res.json(true);
});
router.put('/products', auth, async (req, res) => {
  const {
 _id, description, endDate, tag 
} = req.body;
  await Product.findByIdAndUpdate(_id, { description, endDate, tag });
  res.json(true);
});

router.put('/stake', auth, async (req, res) => {
  const { _id, stake } = req.body;
  const product = await Product.findById(_id);
  product.stakeHistory.push({ user: req.user.username, stake });
  await product.save()
  res.json(true);
});
module.exports = router;
