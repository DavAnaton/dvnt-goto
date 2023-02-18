import dbConnect from "@/lib/dbConnect";
import { LinkDb  } from "@/models/link";
import { NextApiRequest } from "next";
import Link from "next/link";

export async function getServerSideProps(request: NextApiRequest) {
  const { shortLink } = request.query;

  await dbConnect();
  const link = await LinkDb.findOne({ shortLink });
  if (link) {
    return {
      redirect: {
        destination: link.fullLink,
        permanent: false,
      },
    };
  }
  return {
    props: {
      shortLink,
    },
  };
}

export default function NonExistingLink({ shortLink }: { shortLink: string }) {
  return <>
    This link doesn't exist.
    <Link href={`/${shortLink}/create`}>
      <button>Create it</button>
    </Link>
  </>;

}