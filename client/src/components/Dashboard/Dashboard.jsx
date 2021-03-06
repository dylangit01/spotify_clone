import { useState, useEffect } from 'react';
import useAuth from '../../useAuth/useAuth';
import Player from '../Player/Player';
import TrackSearch from '../search/TrackSearch';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import PlayerBtn from '../PlayerBtn/PlayerBtn'

const spotifyApi = new SpotifyWebApi({
	clientId: '5ca23191c3a04e9c99be48a4ab6c81dc',
});

export default function Dashboard({ code }) {
	const accessToken = useAuth(code);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	console.log(searchResults);
	const [playingTrack, setPlayingTrack] = useState();
	const [lyrics, setLyrics] = useState('');

	function chooseTrack(track) {
		setPlayingTrack(track);
		setSearch('');
		setLyrics('');
	}

	// useEffect(() => {
	// 	if (!playingTrack) return;

	// 	axios
	// 		.get('http://localhost:3001/lyrics', {
	// 			params: {
	// 				track: playingTrack.title,
	// 				artist: playingTrack.artist,
	// 			},
	// 		})
	// 		.then((res) => {
	// 			setLyrics(res.data.lyrics);
	// 		});
	// }, [playingTrack]);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;

		let cancel = false;
		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map((track) => {
					const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
						if (image.height < smallest.height) return image;
						return smallest;
					}, track.album.images[0]);

					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: smallestAlbumImage.url,
						preview_url: track.preview_url
					};
				})
			);
		});

		return () => (cancel = true);
	}, [search, accessToken]);

	return (
		<Container className='d-flex flex-column py-2' style={{ height: '100vh' }}>
			<Form.Control
				type='search'
				placeholder='Search Songs/Artists'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
				{searchResults.map((track) => (
					<TrackSearch track={track} key={track.uri} chooseTrack={chooseTrack} />
				))}
				{searchResults.length === 0 && (
					<div className='text-center' style={{ whiteSpace: 'pre' }}>
						{lyrics}
					</div>
				)}
			</div>
			<div>
				{/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}
				{playingTrack?.preview_url && 
					<PlayerBtn trackPreview={playingTrack?.preview_url} />
				}
			</div>
		</Container>
	);
}
