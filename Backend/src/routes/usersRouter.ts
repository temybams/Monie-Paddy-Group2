import express from 'express';
import { createPin } from '../controllers/userController';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.put('/createPin/:id', createPin); 


export default router;
