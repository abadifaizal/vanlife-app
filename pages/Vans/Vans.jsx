import React from "react"
import { Link } from "react-router-dom";

export default function Vans() {
	const [vans, setVans] = React.useState([]);

	React.useEffect(() => {
		fetch('/api/vans')
		.then(response => response.json())
		.then(data => {
			setVans(data.vans);
		})
		.catch(error => console.error(error));
	}, [])

	const vanElements = vans.map(({id, imageUrl, name, price, type}) => (
		<div key={id} className="van-tile">
			<Link to={`/vans/${id}`}>
				<img src={imageUrl} />
				<div className="van-info">
					<h3>{name}</h3>
					<p>${price}<span>/day</span></p>
				</div>
				<i className={`van-type ${type} selected`}>{type}</i>
			</Link>
		</div>
	))

	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<div className="van-list">
				{vanElements}
			</div>
		</div>
	)
}