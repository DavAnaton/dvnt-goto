import LinksForm from "@/components/links/form";
import { NextApiRequest } from "next";
import Head from "next/head";

export async function getServerSideProps(request: NextApiRequest) {
	const { shortLink } = request.query;
	return {
		props: {shortLink},
	};
}


export default function EditLink({ shortLink }: { shortLink: string }) {
	return (
		<>
		<Head>
			<title>Edit link</title>
		</Head>
		<main>
			<h2>go/{shortLink}</h2>
			<br/>
			<LinksForm shortLink={shortLink}/>
			<hr/>
		</main>
		</>
		)
}
