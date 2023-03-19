import React, { useState } from "react"
import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
// import { getVans } from "../../api";
import { getAllVans } from "../../api/firebase";

export async function loader() {
	return defer({ vans: getAllVans() });
}

export default function Vans() {
	// const [vans, setVans] = React.useState(data);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(null);

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

	// function genNewSearchParamString(key, value) {
  //   const sp = new URLSearchParams(searchParams)
  //   if (value === null) {
  //     sp.delete(key)
  //   } else {
  //     sp.set(key, value)
  //   }
  //   return `?${sp.toString()}`
  // }

	// if(loading) {
	// 	return <h1>Loading...</h1>
	// }

	// if(error) {
	// 	return <h1>There was and {error.message}</h1>
	// }

	const [searchParams, setSearchParams] = useSearchParams();
	const dataPromise = useLoaderData();
	const typeFilter = searchParams.get("type");

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

	function renderVanElements(vans) {
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

		return (
			<>
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
			</>
		)
	}

	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<React.Suspense fallback={<h1>Loading vans...🌀</h1>}>
				<Await resolve={dataPromise.vans}>
					{renderVanElements}
				</Await>
			</React.Suspense>
		</div>
	)
}