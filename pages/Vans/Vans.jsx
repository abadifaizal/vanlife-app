import React from "react"
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
	const [vans, setVans] = React.useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");

	React.useEffect(() => {
		fetch('/api/vans')
		.then(response => response.json())
		.then(data => {
			setVans(data.vans);
		})
		.catch(error => console.error(error));
	}, [])

	const displayedVans = typeFilter ? vans.filter(van => van.type.toLowerCase() === typeFilter) : vans;

	const vanElements = displayedVans.map(({id, imageUrl, name, price, type}) => (
		<div key={id} className="van-tile">
			<Link to={id} state={{
					search: `?${searchParams.toString()}`,
					type: typeFilter
				}}>
				<img src={imageUrl} />
				<div className="van-info">
					<h3>{name}</h3>
					<p>${price}<span>/day</span></p>
				</div>
				<i className={`van-type ${type} selected`}>{type}</i>
			</Link>
		</div>
	))

	function genNewSearchParamString(key, value) {
    const sp = new URLSearchParams(searchParams)
    if (value === null) {
      sp.delete(key)
    } else {
      sp.set(key, value)
    }
    return `?${sp.toString()}`
  }
  
  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<div className="van-list-filter-buttons">
				<button 
					className={`van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`}
					onClick={() => handleFilterChange("type", 'simple')}>
						Simple
				</button>
				<button 
					className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`} 
					onClick={() => handleFilterChange("type", 'luxury')}>
						Luxury
				</button>
				<button 
					className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`} 
					onClick={() => handleFilterChange("type", 'rugged')}>
						Rugged
				</button>
				{ typeFilter &&
					<button 
						className="van-type clear-filters" 
						onClick={() => handleFilterChange("type", null)}>
							Clear filter
					</button>
				}
			</div>
			<div className="van-list">
				{vanElements}
			</div>
		</div>
	)
}