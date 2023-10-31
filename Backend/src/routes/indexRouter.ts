import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    const data = {
        title: 'Monie-Padyy'
    }
    // const title = 'Monie-Padyy'
    res.render('index', data)
})
export default router;
