import LinksForm from "@/components/links/form";
import dbConnect from "@/lib/dbConnect";
import { LinkDb, LinkDoc } from "@/models/link";
import { NextApiRequest } from "next";
import Head from "next/head";

export async function getServerSideProps(request: NextApiRequest) {
	const { shortLink } = request.query;
	await dbConnect();
	const link = await LinkDb.findOne({ shortLink }).lean();
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
			<title>Edit link</title>
		</Head>
		<main>
			<h2>go/{link.shortLink}</h2>
			<br/>
			<LinksForm existingLink={link}/>
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
