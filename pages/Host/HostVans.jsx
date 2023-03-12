import React from 'react';
import { Link } from 'react-router-dom';

export default function HostVans() {
  const [hostVans, setHostVans] = React.useState([]);

  React.useEffect(() => {
    fetch('../api/host/vans')
    .then(response => response.json())
    .then(data => {
      setHostVans(data.vans);
    })
    .catch(error => console.error(error))
  }, [])

  const hostVansEls = hostVans.map(({id, imageUrl, name, price}) => (
    <Link to={id} key={id} className="host-van-link-wrapper">
      <div className='host-van-single' key={id}>
        <img src={imageUrl} alt={`Photo of ${name}`}/>
        <div className='host-van-info'>
          <h3>{name}</h3>
          <p>${price}/day</p>
        </div>
      </div>
    </Link>
  ))

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <div className='host-vans-list'>
        {hostVans.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  )
}