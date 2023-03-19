import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function HostVanPhotos() {
  const {currentVan} = useOutletContext();
  return (
    <img className='host-van-detail-image' src={currentVan.imageUrl} alt={currentVan.name} />
  )
}