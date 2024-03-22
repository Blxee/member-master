import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react"

export default function Nav() {
  const navRef = useRef();
  const [height, setHeight] = useState(30);

  useEffect(() => setHeight(navRef.current.offsetHeight), [])

  return (
    <>
      <div style={{height}} />
      <nav ref={navRef} className='position-fixed' style={{float: 'left'}}>
        <span>MemberMaster</span>
        <button>Home</button>
        <button>Dashboard</button>
        <button>Plan</button>
      </nav>
    </>
  )
}
