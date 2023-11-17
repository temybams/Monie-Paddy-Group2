import express from 'express';
import { signup,dashboard } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', (req, res, next) => {
    const data = {
        title: 'Monie-Padyy'
    }
    // const title = 'Monie-Padyy'
    res.render('index', data)
})

router.post('/signup', signup)
router.get('/dashboard', auth, dashboard)
export default router;


