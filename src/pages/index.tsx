import CopyIcon from '@/components/copy-icon';
import Ellipsis from '@/components/ellipsis';
import Table from '@/components/table/table';
import { ColumnDefinitionType } from '@/components/table/types';
import { LinkDoc } from '@/models/link';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

const columns: ColumnDefinitionType<LinkDoc>[] = [
  {
    key: 'shortLink',
    header: 'go/Link',
    render: link => <Link href={`/${link.shortLink}`}>
      go/{link.shortLink}
    </Link>,
  },
  {
    key: 'shortLink',
    header: 'Copy',
    render: link => <CopyIcon text={`go/${link.shortLink}`}/>,
  },
  {
    key: 'fullLink',
    header: 'Target',
    render: link => 
      <Ellipsis maxWidth='200px'>
        <Link href={link.fullLink}>
          {link.fullLink}
        </Link>
      </Ellipsis>
  },
  {
    key: 'shortLink',
    header: 'Edit',
    render: link => <Link href={`/${link.shortLink}/edit`}>
      Edit
    </Link>,
  },
  {
    key: 'shortLink',
    header: 'Views',
    render: link =>  `${link.visits.length} views`,
  },
  {
    key: 'shortLink',
    header: 'Last Access',
    render: link => link.visits[link.visits.length - 1]?.date ?? 'Never',
  },
];


export default function Home() {
  const { data } = useSWR('/api/links');
  return (
    <>
      <Head>
        <title>List links</title>
        <meta name="description" content="Shortlinking App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{display: 'flex'}}>
        <Table data={data?.data ?? []} columns={columns} />
      </main>
    </>
  )
};
