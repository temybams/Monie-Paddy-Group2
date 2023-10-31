import express from 'express';
import { signup } from '../controllers/userController';

const router = express.Router();

router.get('/', (req, res, next) => {
    const data = {
        title: 'Monie-Padyy'
    }
    // const title = 'Monie-Padyy'
    res.render('index', data)
})

router.post('/signup', signup)
export default router;
