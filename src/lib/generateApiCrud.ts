import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import mongoose from 'mongoose';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface CrudReponse<Data>{
	success: boolean;
	data?: Data;
  error?: any;
}

export default function generateCrud<Data, Model extends mongoose.Model<Data, any>>(model: Model) {
  return async (req: NextApiRequest, res: NextApiResponse<CrudReponse<Data>>) => {
    const session = await getServerSession(req, res, authOptions)
    if(!session){
      return res.status(403).json({
        success: false,
        error: "You are not authenticated.",
      })
    }

    const { method } = req;
    const { shortLink } = req.query;

    await dbConnect();
    try{
      switch (method) {
        case 'GET':
          return res.status(200).json({ success: true, data: await model.findOne({shortLink}) });
          break;
        case 'POST':
          return res.status(201).json({ success: true, data: await model.create({shortLink, ...req.body}) });
          break;
        case 'DELETE':
          await model.deleteOne({shortLink});
          return res.status(200).json({ success: true });
          break;
        case 'PUT':
          return res.status(200).json({ success: true, data: await model.updateOne({shortLink}, req.body) });
          break;
        default:
          res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
          res.status(405).end(`Method ${method} Not Allowed`);
          break;
      }
    }catch (error){
      return res.status(400).json({ success: false, error});
    }
  }
}