import React from 'react';
import {Howl} from 'howler'

const PlayerBtn = ({ trackPreview }) => {
	console.log(trackPreview);
	const audioClips = [{ sound: trackPreview, label:'Play' }];
	
	const soundPlay = src => {
		const sound = new Howl({
			src,
			html5: true
		})
		sound.play();
	}

	return (
		<>
			<h1>{trackPreview}</h1>
			{audioClips.map((soundObj, idx) => (
				<button key={idx} onClick={() => soundPlay(soundObj.sound)}>
					{soundObj.label}
				</button>
			))}
		</>
	);
}
 
export default PlayerBtn;