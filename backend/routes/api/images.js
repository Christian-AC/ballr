const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('./../../db/models');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async function(req, res) {
    const images = await db.Image.findAll();
    return res.json(images);
  })
);

router.get(
  '/user/:id',
  asyncHandler(async function(req, res) {
    const userId = req.params.id;
    const images = await db.Image.findAll({
      where: { userId: userId}
    });
    return res.json(images);
  })
);

router.get(
  '/:id',
  asyncHandler(async function(req, res) {
    const images = await db.Image.findByPk(req.params.id);
    return res.json(images);
  })
);

router.post(
  '/',
  asyncHandler(async function(req, res, next) {
    try{
      const newImage = await db.Image.create(req.body);
      return res.json(newImage);
    } catch (err){
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async function(req, res) {
    const image = await db.Image.findByPk(req.params.id);
    await image.destroy();
    return res.json(req.body);
})
);

module.exports = router;
