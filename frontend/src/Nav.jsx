import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
  const navRef = useRef();
  const [height, setHeight] = useState(30);

  useEffect(() => setHeight(navRef.current.offsetHeight), [])

  // const [direction, setDirection] = useState('helllo');
  // useEffect(() => {
  //   const navStyle = window.getComputedStyle(navRef.current);
  //   setDirection(navStyle.getPropertyValue('flex-direction'));
  // }, []);

  return (
    <>
      {/* <div style={{height}} /> */}
      {/* <nav ref={navRef} className='position-fixed d-flex flex-row flex-md-column'> */}
      {/* <h1>{direction}</h1> */}
      <nav ref={navRef} style={{width: '7vw', height: '100dvh'}} className='bg-black d-flex flex-column justify-content-around align-items-center'>
        {/* <span>MemberMaster</span> */}

        <img src='/membermaster.svg' alt='MemberMaster logo' width='70%' />

        <Link to='/' className='nav-element'>
          <FontAwesomeIcon icon={faHouseChimney} color='white' size='2xl' />
        </Link>

        <Link to='/sign-in' className='nav-element'>
          <button style={{borderRadius: -40}}>Sign In</button>
        </Link>

        <Link to='/sign-up' className='nav-element'>
          <button>Sign Up</button>
        </Link>
      </nav>
    </>
  )
}
