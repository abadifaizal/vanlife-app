import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
import VanDetail, { loader as vansDetailLoader } from './pages/Vans/VanDetail';
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import Dashboard, { loader as dashboardLoader } from './pages/Host/Dashboard';
import HostVans , {loader as hostVansLoader} from './pages/Host/HostVans';
import HostVanDetail, { loader as hostVansDetailLoader } from './pages/Host/HostVanDetail';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import NotFound from './components/NotFound';
import "./server";
import Error from './components/Error';
import Login , { loginAction } from './pages/Login';
import AuthRequired from './components/AuthRequired';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route 
      path="login" 
      element={<Login />} 
      action={loginAction} 
      // errorElement={<h1>There was an Error!</h1>}
    />
    <Route path="vans"
      element={<Vans />}
      loader={vansLoader}
      errorElement={<Error/>}
    />
    <Route path="vans/:id"
      element={<VanDetail />}
      loader={vansDetailLoader}
      errorElement={<Error/>}
    />

    <Route element={<AuthRequired/>}>
      <Route path="host" element={<HostLayout />}>
        <Route
          index 
          element={<Dashboard/>}
          loader={dashboardLoader}
          errorElement={<Error/>}
        />
        <Route path='income' element={<Income/>} />
        <Route path='reviews' element={<Reviews/>} />
        <Route path='vans'
          element={<HostVans/>}
          loader={hostVansLoader}
          errorElement={<Error/>}
        />
        <Route path='vans/:id'
          element={<HostVanDetail/>}
          loader={hostVansDetailLoader}
          errorElement={<Error/>}
        >
          <Route index element={<HostVanInfo/>} />
          <Route path='pricing' element={<HostVanPricing/>} />
          <Route path='photos' element={<HostVanPhotos/>} />
        </Route>
      </Route>
    </Route>
    <Route path='*' element={<NotFound/>} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);