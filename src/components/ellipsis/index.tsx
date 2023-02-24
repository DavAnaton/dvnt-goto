interface Params{
	children: any;
	maxWidth?: string;
}

function getNodeText(node: any):string{
  if (['string', 'number'].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
  return '';
}

export default function Ellipsis({children, maxWidth}:Params){
	return <div style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: maxWidth ?? '200px',
        flex: '1',
        display: 'block',
	}} title={getNodeText(children)}>
		{children}
	</div>;
}