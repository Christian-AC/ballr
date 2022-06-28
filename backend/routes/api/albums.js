const express = require('express');
const asyncHandler = require('express-async-handler');
const {Album} = require('./../../db/models');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async function(req, res) {
    const albums = await Album.findAll();
    return res.json(albums);
  })
);

router.get(
  '/user/:id',
  asyncHandler(async function(req, res) {
    const userId = req.params.id;
    const albums = await Album.findAll({
      where: { userId: userId}
    });
    return res.json(albums);
  })
);

router.get(
  '/:id',
  asyncHandler(async function(req, res) {
    const albums = await Album.findByPk(req.params.id);
    return res.json(albums);
  })
);

router.post(
  '/create',
  asyncHandler(async function(req, res, next) {
    try{
      const newAlbum = await Album.create(req.body);
      return res.json(newAlbum);
    } catch (err){
      next(err);
    }
  })
);

router.put(
  '/:id',
  asyncHandler(async function(req, res, next) {
    try{
      const updatedAlbum = await Album.findByPk(req.params.id);
      await updatedAlbum.update(req.body);
      return res.json(updatedAlbum);
    } catch (err){
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async function(req, res) {
    const album = await Album.findByPk(req.params.id);
    await album.destroy();
    return res.json(req.body);
})
);

module.exports = router;
