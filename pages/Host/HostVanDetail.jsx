import React from 'react'
import { NavLink, Outlet, useParams, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../api';

export async function loader({ params }) {
  return defer({ van: getHostVans(params.id) });
}

export default function HostVanDetail() {
  // const { id } = useParams();
  // const [hostVanDetail, setHostVanDetail] = React.useState(null);

  // React.useEffect(() => {
  //   fetch(`/api/host/vans/${id}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     setHostVanDetail(data.vans)
  //   })
  //   .catch(error => console.error(error));
  // }, [id])

  // if(!hostVanDetail) {
  //   return <h1>Loading...</h1>
  // }

  const dataPromise = useLoaderData();

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  return (
    <section>
      <NavLink to=".." relative='path' className='back-button'>&larr; Back to all vans</NavLink>
      <React.Suspense fallback={<h1>Loading...🌀</h1>}>
        <Await resolve={dataPromise.van}>
          {(currentVan) => (
            <div className='host-van-detail-layout-container'>
              <div className='host-van-detail'>
                <img src={currentVan.imageUrl} alt={currentVan.name} />
                <div className='host-van-detail-info-text'>
                  <i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
                  <h3>{currentVan.name}</h3>
                  <h4>${currentVan.price}/day</h4>
                </div>
              </div>
              <nav className='host-van-detail-nav'>
                <NavLink to="." end style={({isActive}) => isActive ? activeStyle : null}>Details</NavLink>
                <NavLink to="pricing" style={({isActive}) => isActive ? activeStyle : null}>Pricing</NavLink>
                <NavLink to="photos" style={({isActive}) => isActive ? activeStyle : null}>Photos</NavLink>
              </nav>
              <Outlet context={{ currentVan }}/>
            </div>
          )}
        </Await>
      </React.Suspense>
    </section>
  )
}