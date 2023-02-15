import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import mongoose from 'mongoose';

interface CrudReponse<Data>{
	success: boolean;
	data?: Data;
}

export default function generateCrud<Data, Model extends mongoose.Model<Data, any>>(model: Model) {
  return async (req: NextApiRequest, res: NextApiResponse<CrudReponse<Data>>) => {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          const link = await model.findOne({_id: id});
          res.status(200).json({ success: true, data: link });
        } catch {
          res.status(404).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const link = await model.create(req.body);
          res.status(201).json({ success: true, data: link });
        } catch {
          res.status(400).json({ success: false });
        }
        break;
      case 'DELETE':
        try {
          const link = await model.deleteOne({_id: id});
          res.status(200).json({ success: true });
        } catch {
          res.status(404).json({ success: false });
        }
        break;
      case 'PUT':
        try {
          const link = await model.updateOne({_id: id}, req.body);
          res.status(200).json({ success: true, data: link });
        } catch {
          res.status(404).json({ success: false });
        }
        break;
      default:
        // res.setHeader('Allow', ['GET', 'PUT'])
        // res.status(405).end(`Method ${method} Not Allowed`)
        res.status(400).json({ success: false });
        break;
    }
  }
}