const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const { getToken, setToken, getDecodedToken } = require('./utils/common');
const SocialAuth = require('./utils/socialAuth');

const isLoggedIn = function (req, res, next) {
  const loggedInToken = getToken(req);
  if (loggedInToken) {
    req.loggedInToken = loggedInToken;
    req.user = getDecodedToken(loggedInToken);
    next();
  } else {
    res.redirect('/sign-in');
  }
};


app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());

    SocialAuth(server);

    // give all Nextjs's request to Nextjs before anything else
    server.get('/_next/*', (req, res) => {
      handle(req, res);
    });

    server.get('/static/*', (req, res) => {
      handle(req, res);
    });

    //local auth routes to keep client logged in
    server.get('/auth/callback/:token', (req, res) => {
      setToken(res, req.params.token || null);
      res.redirect('/');
    });
    server.get('/auth/token', (req, res) => {
      res.json({ token: getToken(req) });
    });



    server.get('/', isLoggedIn, (req, res) => {
      const actualPage = '/index';
      app.render(req, res, actualPage);
    });

    server.get('/sign-in', (req, res) => {
      const actualPage = '/login';
      app.render(req, res, actualPage);
    });

    server.get('/sign-out', (req, res) => {
      setToken(res, '');
      res.redirect('/sign-in');
    });

    server.get('/sign-up', (req, res) => {
      const actualPage = '/signup';
      app.render(req, res, actualPage);
    });


    server.get('/social-login/:provider', (req, res) => {
      const provider = req.params.provider;


    });

    server.get('/recover-password', (req, res) => {
      const actualPage = '/recoverpassword';
      app.render(req, res, actualPage);
    });

    server.get('/welcome-to-dishin', (req, res) => {
      const actualPage = '/welcometodishin';
      app.render(req, res, actualPage);
    });

    server.get('/test-server/:title', isLoggedIn, (req, res) => {
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
