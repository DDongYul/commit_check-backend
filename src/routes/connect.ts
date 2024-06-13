import express, { Request, Response, Router } from 'express'
import * as connect from '../services/connectRepository';

const router: Router = express.Router();

router.get('/', async (req:Request, res:Response) => {
    return res.status(200).json({
        message: connect.test()
    });
})

router.get('/db', async (req:Request, res:Response) => {
    return res.status(200).json({
        message: connect.dbTest()
    });
})

export = router;