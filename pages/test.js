import React, { Component } from 'react'
import Link from 'next/link'
export default class extends Component {
	static getInitialProps({ query }) {
		return { title: query.title }
	}

	render() {
		return <div>
			<h1>Hello, #{this.props.title}</h1>
			<p>
				This component is rendered from server
      		</p>
			<Link href="/"><a>Goto Home</a></Link>
		</div>
	}
}