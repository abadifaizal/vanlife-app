import React from 'react';
import { Link, defer, Await, useLoaderData } from 'react-router-dom';
// import { getHostVans } from '../../api';
import { getHostVans } from '../../api/firebase';

export async function loader() {
  return defer({ vans: getHostVans() })
}

export default function Dashboard() {
  const dataPromise = useLoaderData();

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <div className='host-van-single' key={van.id}>
        <img src={van.imageUrl} alt={van.name} />
        <div className='host-van-info'>
          <h3>{van.name}</h3>
          <p>${van.price}</p>
        </div>
        <Link to={`vans/${van.id}`}>View</Link>
      </div>
    ))

    return (
      <div className='host-van-list'>
        <section>{hostVansEls}</section>
      </div>
    )
  }

  return (
    <>
      <section className='host-dashboard-earnings'>
        <div className='info'>
          <h1>Welcome!</h1>
          <p>Income last <span>30 days</span></p>
          <h2>$2.260</h2>
        </div>
        <Link to='income'>Details</Link>
      </section>
      <section className='host-dashboard-reviews'>
        <h2>Review Score</h2>
        ⭐️
        <p><span>5.0</span>/5</p>
        <Link to='review'>Details</Link>
      </section>
      <section className='host-dashboard-vans'>
        <div className='top'>
          <h2>Your listed vans</h2>
          <Link to='vans'>View All</Link>
        </div>
        <React.Suspense fallback={<h3>Loading...🌀</h3>}>
          <Await resolve={dataPromise.vans}>
            {renderVanElements}
          </Await>
        </React.Suspense>
      </section>
    </>
  )
}