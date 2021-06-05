const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());

app.use(express.json());

app.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: 'http://localhost:3000/callback/',
		clientId: '5ca23191c3a04e9c99be48a4ab6c81dc',
		clientSecret: 'b9022f56c67c4561a5c091a23d1a2b86',
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: 'http://localhost:3000/callback/', // Damn the "Url --> Uri", a character kills everything
		clientId: '5ca23191c3a04e9c99be48a4ab6c81dc',
		clientSecret: 'b9022f56c67c4561a5c091a23d1a2b86',
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400)
		});
});

app.listen(3001, () => {
	console.log('App listening on port 3001!');
});
