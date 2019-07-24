const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const InstagramStrategy = require('passport-instagram').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { APP_URL, API_URL } = require('../utils/config');
const { request } = require('../utils/request2');

const socialSignIn = async function(payload) {
  let params = { ...payload };
  let response = await request(`/users/social-sign-in`, {
    method: 'POST',
    body: {
      ...params
    }
  });
  return response;
};

module.exports = server => {
  const verifyHandler = (accessToken, refreshToken, profile, done) => {
    let signUpWith = '';
    if (profile.provider === 'instagram') {
      signUpWith = 'Instagram';
      const nameArr = profile.displayName.split(' ');
      profile.first_name = nameArr[0];
      profile.last_name = nameArr[1];
      profile.emails = new Array(1).fill({
        value: profile.username + '@' + 'gmail.com'
      });
    }

    if (profile.provider === 'facebook') {
      signUpWith = 'Facebook';
      profile.first_name = profile.name.givenName;
      profile.last_name = profile.name.familyName;
      profile.imageUrl = profile.photos[0].value;
    }

    if (profile.provider === 'google') {
      signUpWith = 'Google';
      profile.first_name = profile.name.givenName;
      profile.lastName = profile.name.familyName;
      profile.email = profile.email;
      profile.imageUrl = profile.photos[0].value;
    }

    let data = {
      signUpWith: signUpWith,
      providerId: profile.id,
      firstName: profile.first_name,
      lastName: profile.last_name,
      password: 'facebook1234',
      confirmPassword: 'facebook1234',
      socialMeta: {
        accessToken,
        refreshToken
      },
      image: profile.imageUrl
    };

    if (profile.emails && profile.emails[0] && profile.emails[0].value) {
      data.email = profile.emails[0].value;
    }
    //fetch api //social-login

    socialSignIn(data)
      .then(response => {
        if (response.status == 'ok') {
          return done(null, response);
        } else {
          return done(null, false, { message: response.error });
        }
      })
      .catch(err => {
        return done(err, false, { message: 'Invalid Login' });
      });
  };

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: '946170095773757', //'318699738713309', //"1165866970222123", // Use your Facebook App Id
        clientSecret: '3384b1a7fb37d55b36a9e2ee8f801ead', //'2f1afdebd940fced3346c5690550cae3', //"b5a47642cd15662884cd089a81973f97", // Use your Facebook App Secret
        callbackURL: `${APP_URL}/auth/facebook/callback`,
        profileFields: ['id', 'email', 'name', 'displayName', 'picture'] //This
      },
      verifyHandler
    )
  );

  passport.use(
    new InstagramStrategy(
      {
        clientID: '8a4c8d6fff434f68b73147f20f704105', //'066c10e2d2d248b5a48c84e4ad3e2262',
        clientSecret: '8d1bb885eb154590a39f728fc191aa2e', //'08e3b247f21e437d9cd1c1fe899f976e',
        callbackURL: `${APP_URL}/auth/instagram/callback`
      },
      verifyHandler
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '534623236006-srt7mh987ri00soggbte1i5adra0eqv7.apps.googleusercontent.com',
        clientSecret: 'b3ZMP5f_vT19Ve-q87Aob1j-',
        callbackURL: `${APP_URL}/auth/google/callback`
      },
      verifyHandler
    )
  );

  server.use(passport.initialize());

  server.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email', 'public_profile']
    })
  );
  server.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/sign-in' }),
    function(req, res) {
      // Successful authentication, redirect home.
      const token = req.user.data.token;
      res.redirect(`/auth/callback?token=${token}`);
    }
  );

  server.get('/auth/instagram', passport.authenticate('instagram'));
  server.get(
    '/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/sign-in' }),
    function(req, res) {
      // Successful authentication, redirect home.
      const token = req.user.data.token;
      res.redirect(`/auth/callback?token=${token}`);
    }
  );

  server.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  server.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/sign-in' }),
    function(req, res) {
      const token = req.user.data.token;
      res.redirect(`/auth/callback?token=${token}`);
    }
  );
  return passport;
};
