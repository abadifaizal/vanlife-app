import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function HostVanPhotos() {
  const {hostVanDetail} = useOutletContext();
  return (
    <img className='host-van-detail-image' src={hostVanDetail.imageUrl} alt={hostVanDetail.name} />
  )
}