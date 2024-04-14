import React from 'react'
import logo from '@/assets/fitgf.png'
import {IoIosBody} from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
        <Image src={logo} alt="Logo"/>
        <h2>FitGenius</h2>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/profile'><IoIosBody/></Link>
        <button>Sign Out</button>
    </nav>
  )
}

export default Navbar