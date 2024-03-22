import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
  const navRef = useRef();
  const [height, setHeight] = useState(30);

  useEffect(() => setHeight(navRef.current.offsetHeight), [])

  return (
    <>
      <div style={{height}} />
      <nav ref={navRef} className='position-fixed'>
        <span>MemberMaster</span>

        <Link to='/'>
          <button>Home</button>
        </Link>

        <Link to='/sign-in'>
          <button>Sign In</button>
        </Link>

        <Link to='/sign-up'>
          <button>Sign Up</button>
        </Link>
      </nav>
    </>
  )
}
