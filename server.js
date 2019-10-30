const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const chalk = require('chalk')
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const {
  getToken,
  setToken,
  getDecodedToken,
  setLocation,
  getLocation,
  decodeToken
} = require('./utils/common');
const SocialAuth = require('./utils/socialAuth');
const { request } = require('./utils/request2');
const { API_URL, APP_URL } = require('./utils/config');
const { stringify } = require('qs');

const hydrateLoggedIn = function (req, res, next) {

  const loggedInToken = getToken(req);
  if (loggedInToken) {
    req.loggedInToken = loggedInToken;
    req.user = getDecodedToken(loggedInToken);
  } else {
    req.loggedInToken = null;
    req.user = null;
  }
  next();
};

const validateRecoveryToken = async function (payload) {
  let { token } = payload;
  let response = await request(
    `${API_URL}/public/check-reset-token?token=${token}`
  );
  return response;
};

const verifyUser = async function (payload) {
  let { token } = payload;
  let response = await request(`${API_URL}/public/verify-email?token=${token}`);
  console.log('response*****', response);
  return response;
};

const getRestaurants = async function (payload, token) {
  const queryParams = stringify(payload, { encodeValuesOnly: true });
  let tempToken = null;
  const url = `${API_URL}/restaurants/search?${queryParams}`;
  if (token) {
    tempToken = `Bearer ${token}`;
  } else {
    tempToken = `Bearer `;
  }
  let response = await request(url, {
    headers: { Authorization: tempToken }
  });
  if (response.status.toLowerCase() === 'ok') {
    return response.data;
  } else {
    return [];
  }
};
const getMenus = async () => {
  console.log("menues called ");
  const url = `${API_URL}/restaurants/getMenus`;
  let response = await request(url);
  console.log(chalk.blue("response===="), response);
  if (response.status.toLowerCase() === 'ok') {
    return response.data;
  } else {
    console.log("nothing retrieve");
  }
}
const getReviews = async function (res, payload) {
  const url = `${API_URL}/reviews`;
  const token = payload.token;
  let response = await request(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.status.toLowerCase() === 'ok') {
    return response.data;
  } else {
  }
};

const getSystemRewards = async function () {
  const url = `${API_URL}/systemRewards`;
  let response = await request(url);
  if (response.status.toLowerCase() === 'ok') {
    return response.data;
  } else {
    return [];
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
    server.get('/auth/callback', (req, res) => {
      setToken(res, req.query.token || null);
      let redirectUrl = req.query.redirect || '/';
      res.redirect(redirectUrl);
    });
    server.get('/auth/token', (req, res) => {
      res.json({ token: getToken(req) });
    });

    server.get('/', hydrateLoggedIn, (req, res) => {
      // const actualPage = '/index';
      // app.render(req, res, actualPage);
      let isLoggedIn = req.loggedInToken ? true : false;
      if (isLoggedIn) {
        res.redirect('/restaurants');
      } else {
        res.redirect('/welcome-to-dishin');
      }
    });

    server.get('/sign-in', (req, res) => {
      let redirectUrl = req.query.redirect || '';
      const actualPage = '/login';
      app.render(req, res, actualPage, { redirect: redirectUrl });
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

    server.get('/reset-password', (req, res) => {
      const actualPage = '/resetpassword';
      const queryParams = { token: req.query.token };
      validateRecoveryToken(queryParams)
        .then(response => {
          if (response.status == 'ok' && response.isTokenValid) {
            app.render(req, res, actualPage, queryParams);
          } else {
            app.render(req, res, actualPage, { token: null });
          }
        })
        .catch(err => {
          app.render(req, res, actualPage, { token: null });
        });
    });

    server.get('/verify-email', (req, res) => {
      const queryParams = { token: req.query.token };
      const actualPage = '/verifyemail';
      verifyUser(queryParams)
        .then(response => {
          if (response.status.toLowerCase() === 'ok') {
            app.render(req, res, actualPage, {
              verifyStatus: response.verifyStatus
            });
          } else {
            app.render(req, res, actualPage, { verifyStatus: null });
          }
        })
        .catch(err => {
          app.render(req, res, actualPage, { verifyStatus: null });
        });
    });

    server.get('/restaurants', hydrateLoggedIn, (req, res) => {
      let query = req.query || {};
      let isLoggedIn = req.loggedInToken ? true : false;
      let userData = req.user || {};
      getRestaurants(query, req.loggedInToken).then(response => {
        console.log("response dishes====>", response.dishes);
        query.restaurants = response.restaurants || [];
        query.dishes = response.dishes || [];
        query.similarRestaurants = response.similarRestaurants || [];
        query.isLoggedIn = isLoggedIn;
        query.user = req.user;
        query.loggedInToken = req.loggedInToken;
        query.systemTags = response.systemTags;
        const actualPage = '/restaurants-search';
        app.render(req, res, actualPage, query);
      });
    });

    server.get('/my-reviews', hydrateLoggedIn, (req, res) => {
      console.log("my review ======>", req.loggedInToken);
      const actualPage = '/my-reviews';
      // let user_id = null;
      // if (req.user) {
      //   user_id = req.user.user_id;
      // } else {
      //   res.redirect('/sign-in');
      // }
      getReviews(res, { token: req.loggedInToken }).then(response => {
        const query = {
          myreviews: response,
          user: req.user,
          isLoggedIn: req.loggedInToken ? true : false,
          loggedInToken: req.loggedInToken
        };
        app.render(req, res, actualPage, query);
      });
    });

    server.get('/rewards', hydrateLoggedIn, (req, res) => {
      const actualPage = '/rewards';
      getSystemRewards().then(response => {
        const query = {
          rewards: response,
          user: req.user,
          isLoggedIn: req.loggedInToken ? true : false,
          loggedInToken: req.loggedInToken
        };
        app.render(req, res, actualPage, query);
      });
    });

    server.get('/user-update/callback', (req, res) => {
      let token = req.query.token || null;

      setToken(res, token);
      let user = getDecodedToken(token);

      res.json({ user, token });
      // let redirectUrl = req.query.redirect || '/';
      // res.redirect(redirectUrl);
    });


    server.get('/restaurants/:id', (req, res) => {
      console.log("Params===>", req.params);
      getMenus().then(response => {
        app.render(req, res, '/showmenu', { id: req.params.id, menuData: response })
        console.log("menu response =====>", res);
      }).catch(err => {
        console.log("error menu respinse", err);
      })

    })

    server.get("/dish-details/:id/:name", (req, res) => {
      console.log(req.params);
      app.render(req, res, '/dish-details', { id: req.params.id, name: req.params.name });
    })


    server.get("/social-medialist", (req, res) => {
      app.render(req, res, "/social-medialist");
    })

    server.get("/thankyou", (req, res) => {
      app.render(req, res, "/thankyou");
    })

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3001, err => {
      if (err) throw err;
      console.log(`> Ready on ${APP_URL}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
