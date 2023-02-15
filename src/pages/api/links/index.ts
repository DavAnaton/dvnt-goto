// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Link } from '@/models/link'
import generateApiList from '@/lib/generateApiList';

export default generateApiList(Link);