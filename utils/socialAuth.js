const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const InstagramStrategy = require('passport-instagram').Strategy;

module.exports = (server) => {
	const verifyHandler = (token, tokenSecret, profile, done) => {
		if (profile.provider === 'instagram') {
			const nameArr = profile.displayName.split(' ');
			profile.first_name = nameArr[0];
			profile.last_name = nameArr[1];
			profile.emails = new Array(1).fill({ value: profile.username + '@' + 'gmail.com' });
		}

		if (profile.provider === 'facebook') {
			profile.first_name = profile.name.givenName;
			profile.last_name = profile.name.familyName;
		}

		var data = {
			provider: profile.provider,
			uid: profile.id,
			name: profile.first_name + ' ' + profile.last_name,
			password: profile.emails[0].value
		};

		if (profile.emails && profile.emails[0] && profile.emails[0].value) {
			data.email = profile.emails[0].value;
		}
		console.log('social callback', data);
		// set token here
		//fetch api //social-login

		return done(null, false, { message: 'Invalid Login' });
	};

	passport.use(new FacebookStrategy({
		clientID: "1165866970222123", // Use your Facebook App Id
		clientSecret: "b5a47642cd15662884cd089a81973f97", // Use your Facebook App Secret
		callbackURL: "/auth/facebook/callback",
		profileFields: ['id', 'emails', 'name'] //This
	}, verifyHandler));

	passport.use(new InstagramStrategy({
		clientID: '066c10e2d2d248b5a48c84e4ad3e2262',
		clientSecret: '08e3b247f21e437d9cd1c1fe899f976e',
		callbackURL: "/auth/instagram/callback"
	}, verifyHandler));


	server.use(passport.initialize());

	server.get('/auth/facebook', passport.authenticate('facebook'));
	server.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/sign-in' }), function (req, res) {
		// Successful authentication, redirect home.
		res.redirect(`/`);
	});

	server.get('/auth/instagram', passport.authenticate('instagram'));
	server.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/sign-in' }), function (req, res) {
		// Successful authentication, redirect home.

		res.redirect(`/`);
	});

	return passport;
}