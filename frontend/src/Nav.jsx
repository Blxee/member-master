import { faHouseChimney, faUser } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { UserContext } from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
  const { user, setUser } = useContext(UserContext);

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
      <nav ref={navRef} className='bg-gradient d-flex flex-column justify-content-start gap-5 align-items-center'>
        {/* <span>MemberMaster</span> */}

        <img className='mt-4' src='/membermaster.svg' alt='MemberMaster logo' width='70%' />

        <Link to='/' className='nav-element'>
          <FontAwesomeIcon icon={faHouseChimney} color='white' size='xl' />
        </Link>

        <Link to='/sign-in' className='nav-element'>
          <button>Sign In</button>
        </Link>

        <Link to='/sign-up' className='nav-element'>
          <button>Sign Up</button>
        </Link>

        { user &&
          <Link to='/profile' className='nav-element mt-auto mb-5'>
            <FontAwesomeIcon icon={faUser} color='white' size='xl' />
          </Link>
        }
      </nav>
    </>
  )
}
