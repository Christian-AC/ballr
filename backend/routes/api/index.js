// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imageRouter = require('./images.js');
const albumRouter = require('./albums.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/images', imageRouter);

router.use('/albums', albumRouter);


module.exports = router;
