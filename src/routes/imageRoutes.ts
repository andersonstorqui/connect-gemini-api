import { Router } from 'express';
import { getImageById, getAllImages, getResizedImageById } from '../controllers/imageControllers';

const router = Router();

router.get('/images/:id', getImageById);
router.get('/images', getAllImages);
router.get('/images/:id/resize', getResizedImageById);

export default router;
