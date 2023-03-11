import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

export default function HostVanDetail() {
  const { id } = useParams();
  const [hostVanDetail, setHostVanDetail] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/host/vans/${id}`)
    .then(response => response.json())
    .then(data => {
      setHostVanDetail(data.vans)
    })
    .catch(error => console.error(error));
  }, [id])

  if(!hostVanDetail) {
    return <h1>Loading...</h1>
  }

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  return (
    <section>
      <NavLink to=".." relative='path' className='back-button'>&larr; Back to all vans</NavLink>
      <div className='host-van-detail-layout-container'>
        <div className='host-van-detail'>
          <img src={hostVanDetail.imageUrl} alt={hostVanDetail.name} />
          <div className='host-van-detail-info-text'>
            <i className={`van-type van-type-${hostVanDetail.type}`}>{hostVanDetail.type}</i>
            <h3>{hostVanDetail.name}</h3>
            <h4>${hostVanDetail.price}/day</h4>
          </div>
        </div>
        <nav className='host-van-detail-nav'>
          <NavLink to="." end style={({isActive}) => isActive ? activeStyle : null}>Details</NavLink>
          <NavLink to="pricing" style={({isActive}) => isActive ? activeStyle : null}>Pricing</NavLink>
          <NavLink to="photos" style={({isActive}) => isActive ? activeStyle : null}>Photos</NavLink>
        </nav>
        <Outlet context={{ hostVanDetail }}/>
      </div>
    </section>
  )
}