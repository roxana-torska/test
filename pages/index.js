import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router';
export default class extends Component {
	static getInitialProps({ req }) {
		const { user } = req;
		if (!user) {
			Router.push('/sign-in');
		}
		return { user }
	}

	render() {
		return <div>
			<p>Hello, {this.props.user.email} This is Dishin App</p>
			<Link href={`${process.env.appUrl}/test-server/DrMac`}>
				<a>Click to DrMac (<small>It will load page from express server route</small>)</a>
			</Link>
			<br />
			<br />
			<Link href={`/sign-out`}>
				<a>Sing out</a>
			</Link>
		</div>
	}
}