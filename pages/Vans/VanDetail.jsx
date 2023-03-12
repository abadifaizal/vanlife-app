import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function VanDetail() {
  const params = useParams();
  const location = useLocation();
  const [van, setVans] = React.useState(null);
  
  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
    .then(response => response.json())
    .then(data => {
      setVans(data.vans);
    })
    .catch(error => console.error(error))
  }, [params.id])

  const search = location.state?.search || "";
  const type = location.state?.type || "all vans";

  console.log(type)
  return (
    <div className='van-detail-container'>
      <Link to={`..${search}`} relative='path' className='back-button'>&larr; Back to {`${type.slice(0, 1).toUpperCase() + type.slice(1)}`}</Link>
      {van ? (
        <div className='van-detail'>
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className='van-price'><span>${van.price}</span>/day</p>
          <p>{van.description}</p>
          <button className='link-button'>Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default VanDetail;