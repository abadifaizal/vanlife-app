import React, { useState } from "react"
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
	return getVans();
}

export default function Vans() {
	// const [vans, setVans] = React.useState(data);
	const [searchParams, setSearchParams] = useSearchParams();
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(null);
	const typeFilter = searchParams.get("type");
	const vans = useLoaderData();

	// React.useEffect(() => {
	// 	async function loadVans() {
	// 		setLoading(true);
	// 		try {
	// 			const data = await getVans();
	// 			setVans(data);
	// 		} catch(err) {
	// 			setError(err)
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}

	// 	loadVans();
	// }, [])

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

	// if(loading) {
	// 	return <h1>Loading...</h1>
	// }

	// if(error) {
	// 	return <h1>There was and {error.message}</h1>
	// }

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