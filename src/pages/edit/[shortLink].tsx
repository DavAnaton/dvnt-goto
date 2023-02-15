import dbConnect from "@/lib/dbConnect";
import { Link, LinkDoc } from "@/models/link";
import { NextApiRequest } from "next";
import Head from "next/head";

export async function getServerSideProps(request: NextApiRequest) {
  const { shortLink } = request.query;
  await dbConnect();
  const link = await Link.findOne({ shortLink }).lean();
  if(!link) return {
    redirect: {
      destination: '/404',
      permanent: false,
    }
  }
  link._id = link._id.toString()

  return {
    props: {
      link,
    },
  };
}


export default function EditLink({ link }: { link: LinkDoc }) {
  return (
    <>
      <Head>
        <title>go/{link.shortLink}</title>
      </Head>
      <main>
        {link.shortLink}
        {link.fullLink}
      </main>
    </>
  )
}
