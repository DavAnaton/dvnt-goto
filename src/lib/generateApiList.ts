import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import mongoose from 'mongoose';

interface ListReponse<Data>{
	success: boolean;
	data?: Data[];
}

export default function generateList<Data, Model extends mongoose.Model<Data, any>>(model: Model) {
  return async (req: NextApiRequest, res: NextApiResponse<ListReponse<Data>>) => {
    const { method } = req;
    await dbConnect();
    try {
      const links = await model.find({});
      res.status(200).json({ success: true, data: links });
    } catch {
      res.status(400).json({ success: false });
    }
  }
}