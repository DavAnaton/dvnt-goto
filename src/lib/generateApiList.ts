import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface ListReponse<Data>{
	success: boolean;
	data?: Data[];
  error?: string;
}

export default function generateList<Data, Model extends mongoose.Model<Data, any>>(model: Model) {
  return async (req: NextApiRequest, res: NextApiResponse<ListReponse<Data>>) => {
    const session = await getServerSession(req, res, authOptions)
    if(!session){
      return res.status(401).json({
        success: false,
        error: "You are not authenticated.",
      })
    }

    await dbConnect();
    try {
      const links = await model.find({});
      return res.status(200).json({ success: true, data: links });
    } catch {
      return res.status(400).json({ success: false });
    }
  }
}