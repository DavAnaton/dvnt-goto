interface Params{
	text: string;
}

export default function CopyIcon({text}: Params){
	return <span onClick={() => {navigator.clipboard.writeText(text)}}>Copy</span>;
}