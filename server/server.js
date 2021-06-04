const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());

app.use(express.json());

app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: 'http://localhost:3000/callback/',	// Damn the "Url --> Uri", a character kills everything
		clientId: '2baa05a85a284865a4cdde82479ff3a9',
		clientSecret: 'b0151a612f7f423d979a4e4c63a2f5b1',
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
