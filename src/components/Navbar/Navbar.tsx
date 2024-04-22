"use client"
import React from 'react'
import logo from '@/assets/fitgf.png'
import { IoIosBody } from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup'

const Navbar = () => {
  const [isloggedin, setIsloggedin] = React.useState<boolean>(false)

  const [showpopup, setShowpopup] = React.useState<boolean>(false)
  return (
    <nav>
      <Image src={logo} alt="Logo" />
      <h2>FitGenius</h2>
      <Link href='/'>Home</Link>
      <Link href='/about'>About</Link>
      <Link href='/profile'><IoIosBody /></Link>
      {
        isloggedin ?
          <button>Logout</button>
          :
          <button
          onClick={() => {
            setShowpopup(true)
        }}
        >Login</button>
      }
      {
        showpopup && <AuthPopup setShowpopup={setShowpopup}/>
      }
    </nav>
  )
}

export default Navbar