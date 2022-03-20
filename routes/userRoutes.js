import express from 'express'
const router = express.Router();
import userController from '../controllers/userController.js'
import checkUserAuth from '../middlewares/authMiddleware.js'
//route Lavel Middleware - to protect Route
router.use('/changepassword', checkUserAuth)
router.use('/userprofile', checkUserAuth)
//public routes
router.post('/register', userController. userRegistration);
router.post('/login', userController. userLogin);

// Protected Routes
router.post('/changepassword', userController.changeUserPassword)
router.get('/userprofile', userController.loggedUser)
export default router;
