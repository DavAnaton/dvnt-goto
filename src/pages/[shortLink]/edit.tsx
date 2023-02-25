import LinksForm from "@/components/links/form";
import dbConnect from "@/lib/dbConnect";
import { LinkDb, LinkDoc } from "@/models/link";
import Head from "next/head";
import Table from '@/components/table/table';
import { GetServerSidePropsContext } from 'next'
import { IVisit, VisitDoc } from "@/models/visit";
import { ColumnDefinitionType } from "@/components/table/types";

export async function getServerSideProps(request: GetServerSidePropsContext) {
	const { shortLink } = request.query;
	await dbConnect();
	const link = await LinkDb.findOne({ shortLink }).lean();
	if(!link) return {
		redirect: {
			destination: '/404',
			permanent: false,
		}
	}

	return {
		props: {
			link: JSON.parse(JSON.stringify(link)),
		},
	};
}

const usageColumns: ColumnDefinitionType<IVisit>[]  = [
  {
    key: 'date',
    header: 'Date',
  },
  {
    key: 'user',
    header: 'User',
  },
];

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
			<Table data={link.visits} columns={usageColumns}/>
		</main>
		</>
		)
}
