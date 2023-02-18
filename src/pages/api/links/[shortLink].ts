// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { LinkDb } from '@/models/link'
import generateApiCrud from '@/lib/generateApiCrud';

export default generateApiCrud(LinkDb);