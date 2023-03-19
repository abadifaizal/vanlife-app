import React from 'react';
import { Link, useLocation, useParams, useLoaderData, defer, Await } from 'react-router-dom';
import { getVans } from '../../api';

export async function loader({ params }) {
  return defer({ van: getVans(params.id) })
}

function VanDetail() {
  // const params = useParams();
  const location = useLocation();
  // const [van, setVans] = React.useState(null);
  
  // React.useEffect(() => {
  //   fetch(`/api/vans/${params.id}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     setVans(data.vans);
  //   })
  //   .catch(error => console.error(error))
  // }, [params.id])

  const dataPromise = useLoaderData();
  const search = location.state?.search || "";
  const type = location.state?.type || "all vans";

  function renderVanDetailElements(van) {
    return (
      <div className='van-detail'>
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className='van-price'><span>${van.price}</span>/day</p>
        <p>{van.description}</p>
        <button className='link-button'>Rent this van</button>
      </div>
    )
  }

  return (
    <div className='van-detail-container'>
      <Link 
        to={`..${search}`}
        relative='path'
        className='back-button'>
          &larr; Back to {`${type.slice(0, 1).toUpperCase() + type.slice(1)}`}
      </Link>
      <React.Suspense fallback={<h1>Loading...🌀</h1>}>
        <Await resolve={dataPromise.van}>
          {renderVanDetailElements}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default VanDetail;