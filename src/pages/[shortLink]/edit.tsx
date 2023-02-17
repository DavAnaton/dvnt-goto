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
        <h2>go/{link.shortLink}</h2>
        <h3>URL</h3>
        Current Value: {link.fullLink.slice(0,100)}...
        <input value={link.fullLink}/>
        <h3>Owners</h3>
        Current Value: Me
        <input value="Me"/>
        <button>Save</button>
        <button>Cancel</button>
        <button>Delete</button>
        <hr/>
        <h3>Change history</h3>
        Who did what | When | Description(value)
        <hr/>
        <h3>Metrics</h3>
        Access by time, users, ...
      </main>
    </>
  )
}
