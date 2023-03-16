const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const {Image} = require('./../../db/models');
const router = express.Router();

const {
  singleMulterUpload,
  singlePublicFileUpload,
} = require("../../awsS3");


router.get(
  '/',
  asyncHandler(async function(req, res) {
    const images = await Image.findAll();
    return res.json(images);
  })
);

router.get(
  '/user/:id',
  asyncHandler(async function(req, res) {
    const userId = req.params.id;
    const images = await Image.findAll({
      where: { userId: userId}
    });
    return res.json(images);
  })
);

router.get(
  '/:id',
  asyncHandler(async function(req, res) {
    const images = await Image.findByPk(req.params.id);
    return res.json(images);
  })
);

// router.post(
//   '/',
//   asyncHandler(async function(req, res, next) {
//     try{
//       const newImage = await Image.create(req.body);
//       return res.json(newImage);
//     } catch (err){
//       next(err);
//     }
//   })
// );

router.post(
  "/",
  singleMulterUpload("image"),

  asyncHandler(async (req, res) => {
    const { content, userId, albumId } = req.body;
    const imgUrl = await singlePublicFileUpload(req.file);
    const newImage = await Image.create({
      imgUrl,
      userId,
      albumId,
      content,
    });

    setTokenCookie(res, user);

    return res.json({
      newImage,
    });
  })
);

router.put(
  '/:id',
  asyncHandler(async function(req, res, next) {
    try{
      const updatedImage = await Image.findByPk(req.params.id);
      await updatedImage.update(req.body);
      return res.json(updatedImage);
    } catch (err){
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async function(req, res) {
    const image = await Image.findByPk(req.params.id);
    await image.destroy();
    return res.json(req.body);
})
);

module.exports = router;
