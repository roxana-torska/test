const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express();

		// give all Nextjs's request to Nextjs before anything else
		server.get('/_next/*', (req, res) => {
			handle(req, res);
		});

		server.get('/static/*', (req, res) => {
			handle(req, res);
		});

		server.get('/', (req, res) => {
			const actualPage = '/login'
			app.render(req, res, actualPage)
		});
		server.get('/test-server/:title', (req, res) => {
			const actualPage = '/test'
			const queryParams = { title: req.params.title }
			app.render(req, res, actualPage, queryParams)
		});

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3001, (err) => {
			if (err) throw err
			console.log('> Ready on http://localhost:3001')
		})
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	})