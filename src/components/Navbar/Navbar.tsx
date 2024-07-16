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

  // Function to check login status
  const checklogin = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      if (data.ok) {
        setIsloggedin(true);
      } else {
        setIsloggedin(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      
      if (data.ok) {
        setIsloggedin(false); // Update the state
        setShowpopup(false); // Close the popup if it is open
      } else {
        console.error(data.message); // Handle errors appropriately
      }
    } catch (err) {
      console.error(err); // Handle fetch errors
    }
  }

  React.useEffect(() => {
    checklogin();
  }, [showpopup]);

  return (
    <nav>
      <Image src={logo} alt="Logo" />
      <h2>FitGenius</h2>
      <Link href='/'>Home</Link>
      <Link href='/about'>About</Link>
      <Link href='/profile'><IoIosBody /></Link>
      {
        isloggedin ?
          <button onClick={handleLogout}>Logout</button>
          :
          <button onClick={() => setShowpopup(true)}>Login</button>
      }
      {
        showpopup && <AuthPopup setShowpopup={setShowpopup} />
      }
    </nav>
  )
}

export default Navbar;
