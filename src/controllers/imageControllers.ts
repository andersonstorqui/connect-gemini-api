import { Request, Response } from 'express';
import axios from 'axios';
import sharp from 'sharp';
import Image from '../models/image';

export const getImageById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const image = await Image.findByPk(id);
    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const geminiResponse = await axios.get(`${process.env.GEMINI_API_URL}/${id}`);
    
    res.json({
      ...image.toJSON(),
      geminiData: geminiResponse.data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image' });
  }
};

export const getAllImages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

export const getResizedImageById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { width, height } = req.query;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const geminiResponse = await axios.get(`${process.env.GEMINI_API_URL}/${id}`);

    const imageBuffer = await sharp(geminiResponse.data.url)
      .resize(parseInt(width as string), parseInt(height as string))
      .toBuffer();

    res.set('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to resize image' });
  }
};
