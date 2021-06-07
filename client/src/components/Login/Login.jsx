import React from 'react';
import { Container } from 'react-bootstrap';

const AUTH_URL =
	'https://accounts.spotify.com/authorize?client_id=5ca23191c3a04e9c99be48a4ab6c81dc&response_type=code&redirect_uri=http://localhost:3002/callback/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function Login() {
	return (
		<Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
			<a className='btn btn-success btn-lg' href={AUTH_URL}>
				Login With Spotify
			</a>
		</Container>
	);
}
