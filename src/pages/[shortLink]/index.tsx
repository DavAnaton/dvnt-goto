import dbConnect from "@/lib/dbConnect";
import { LinkDb  } from "@/models/link";
import { VisitDb  } from "@/models/visit";
import { getServerSession } from "next-auth/next"
import Link from "next/link";
import { GetServerSidePropsContext } from 'next'

import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if(!session){
    return {};
  }

  const { shortLink } = ctx.query;

  await dbConnect();
  const link = await LinkDb.findOne({ shortLink });
  if (link) {
    link.visits.push(await VisitDb.create({
      link: shortLink,
      user: session.user?.email,
      date: Date.now(),
    }));
    link.save();
    
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
    This link does not exist.
    <Link href={`/${shortLink}/create`}>
      <button>Create it</button>
    </Link>
  </>;

}