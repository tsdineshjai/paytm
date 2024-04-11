import axios from "axios";
import React from "react";

function Dashboard() {
	const [details, setDetails] = React.useState({});
	const [balance, setBalance] = React.useState(0);

	const [users, setUsers] = React.useState([]);
	const [query, setQuery] = React.useState("");

	React.useEffect(() => {
		const value = localStorage.getItem("token");
		const { userId } = JSON.parse(value);
		axios
			.get(`http://localhost:3000/api/v1/user/bulk?filter=${userId}`)
			.then((response) => {
				if (response.statusText) {
					setDetails({
						...response.data.users[0],
					});
				}
			})
			.catch((err) => console.log(err));
	}, []);
	React.useEffect(() => {
		if (query) {
			axios
				.get(`http://localhost:3000/api/v1/user/bulk?filter=${query}`)
				.then((response) => {
					if (response.statusText) {
						setUsers({
							...response.data.users,
						});
					}
				})
				.catch((err) => console.log(err));
		}
	}, [query]);

	React.useEffect(() => {
		const value = localStorage.getItem("token");
		const { token } = JSON.parse(value);
		axios({
			method: "get",
			url: `http://localhost:3000/api/v1/account/balance`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.statusText) {
					setBalance(response.data.balance);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			Check the console of the dashboard
			{JSON.stringify(details)}
			<p> ₹ {Math.floor(balance)} </p>
			<input
				type="text"
				name="user-search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<div>{JSON.stringify(users)}</div>
		</div>
	);
}

export default Dashboard;
