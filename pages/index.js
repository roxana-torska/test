import Link from 'next/link'
const App = () => (
	<div>
		<p>Hello,  This is Dishin App</p>
		<Link href={`/test-server/DrMac`}>
			<a>Click to DrMac (<small>It will load page from express server route</small>)</a>
		</Link>
	</div>
)

export default App