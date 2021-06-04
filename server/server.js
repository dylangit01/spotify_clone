const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUrl: 'http://localhost:3000',
		clientId: '03654ec3c0914f12b7040a2ecc692e1e',
		clientSecret: '1f3c9284409c47749c303e577cd27198',
	});
});

spotifyApi
	.authorizationCode(code)
	.then((data) => {
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in,
		});
	})
	.catch(() => res.sendStatus(400));

	app.listen(3001, () => {
		console.log('App listening on port 3001!');
	});
