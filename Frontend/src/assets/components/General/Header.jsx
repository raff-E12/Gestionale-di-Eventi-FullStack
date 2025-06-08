import React from 'react'
import Logo from "../../../../public/icons/logo.svg"

export default function Header() {
  return (<>
  <header className="header-sc">
  <div className="logo-sc">
    <img src={Logo} alt="Logo"/>
    <h4 className="text-xl font-semibold text-gray-800 uppercase font-montserrant">Planify</h4>
  </div>
  <div className="btn-group">
    <button className='btn-general-primary'>Accedi</button>
    <button className='btn-general-primary'>Dashboard</button>
  </div>
</header>
  </> )
}
