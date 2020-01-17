const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protect routes after this, in req.user
router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);

router
  .route('/subscriptions')
  .get(userController.getMe, userController.getUserSubscriptions)
  .post(userController.addSubscription);

router
  .route('/subscriptions/:id')
  .delete(userController.deleteSubscription)
  .patch(userController.updateSubscription);

module.exports = router;
