const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { getToken } = require('./utils/common');

const isLoggedIn = function(req, res, next) {
  const isLoggedIn = getToken();
  if (isLoggedIn) {
    console.log('logged in');
    next();
  } else {
    console.log('not logged in');
    //req.noAuth = true;
    res.redirect('/sign-in');
    //next();
  }
};
app
  .prepare()
  .then(() => {
    const server = express();

    // give all Nextjs's request to Nextjs before anything else
    server.get('/_next/*', (req, res) => {
      handle(req, res);
    });

    server.get('/static/*', (req, res) => {
      handle(req, res);
    });

    server.get('/', isLoggedIn, (req, res) => {
      console.log('After login check');
      if (req.noAuth) {
        return res.redirect(req.noAuthRedirect);
      }
      const actualPage = '/index';
      app.render(req, res, actualPage);
    });

    server.get('/sign-in', (req, res) => {
      const actualPage = '/login';
      app.render(req, res, actualPage);
    });

    server.get('/sign-up', (req, res) => {
      const actualPage = '/signup';
      app.render(req, res, actualPage);
    });

    server.get('/recover-password', (req, res) => {
      const actualPage = '/recoverpassword';
      app.render(req, res, actualPage);
    });

    server.get('/welcome-to-dishin', (req, res) => {
      const actualPage = '/welcometodishin';
      app.render(req, res, actualPage);
    });

    server.get('/test-server/:title', (req, res) => {
      const actualPage = '/test';
      const queryParams = { title: req.params.title };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/reset-password/:token', (req, res) => {
      const actualPage = '/resetpassword';
      const queryParams = { token: req.params.token };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3001, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3001');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
