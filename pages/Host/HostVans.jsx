import React from 'react';
import { Link, useLoaderData, defer, Await } from 'react-router-dom';
import { getHostVans } from '../../api';

export async function loader() {
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  // const [hostVans, setHostVans] = React.useState([]);

  // React.useEffect(() => {
  //   fetch('../api/host/vans')
  //   .then(response => response.json())
  //   .then(data => {
  //     setHostVans(data.vans);
  //   })
  //   .catch(error => console.error(error))
  // }, [])

  const dataPromise = useLoaderData();
  function renderHostVansElements(hostVans) {
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
      <div className='host-vans-list'>
        {hostVans.length > 0 && hostVansEls}
      </div>
    )
  }


  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <React.Suspense fallback={<h2>Loading...🌀</h2>}>
        <Await resolve={dataPromise.vans}>
          {renderHostVansElements}
        </Await>
      </React.Suspense>
    </section>
  )
}