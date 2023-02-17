import dbConnect from "@/lib/dbConnect";
import { Link } from "@/models/link";
import { NextApiRequest } from "next";
 
export async function getServerSideProps(request: NextApiRequest) {
  const { shortLink } = request.query;

  await dbConnect();
  const link = await Link.findOne({ shortLink });
  if (link) {
    return {
      redirect: {
        destination: link.fullLink,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/create/'+shortLink,
        permanent: false,
      }
    }
  }
}

export default function GoToPage() {}