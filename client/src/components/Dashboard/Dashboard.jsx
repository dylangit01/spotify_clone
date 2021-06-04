import React from 'react';
import useAuth from '../../useAuth/useAuth'

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code)
	console.log(accessToken);
	return (
		<>
			<h1>Dashboard</h1>
			<p>{code}</p>
		</>	
	 );
}
 
export default Dashboard;