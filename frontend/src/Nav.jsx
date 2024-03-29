import { faHouseChimney, faRightFromBracket, faRightToBracket, faRocket, faUser } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { UserContext } from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const { user, setUser, pushAlert } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    fetch('http://localhost:5000/api/users/sign-out', {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        pushAlert('hello', 'success')
        console.log('Signed out successfully!');
        navigate('/')
      }
    });
  };

  return (
    <>
      <nav className='position-sticky top-0 align-self-start bg-gradient d-flex flex-column justify-content-start gap-5 align-items-center'>
        <Link to='/' className='nav-element mt-4'>
          <img style={{filter: 'contrast(300%)'}} src='/membermaster-gray.svg' alt='MemberMaster logo' width='80%' />
        </Link>

        <Link to='/' className='nav-element'>
          <FontAwesomeIcon icon={faHouseChimney} color='white' size='xl' />
          <span className='nav-label fw-bold text-white translate-middle-y'>Home</span>
        </Link>

        { user &&
          <Link to='/profile/my___udddd' className='nav-element'>
            <FontAwesomeIcon icon={faUser} color='white' size='xl' />
            <span className='nav-label fw-bold text-white translate-middle-y'>Profile</span>
          </Link>
        }

        { !user &&
          <Link to='/sign-up' className='nav-element'>
            <FontAwesomeIcon icon={faRightToBracket} color='white' size='xl' />
            <span className='nav-label fw-bold text-white translate-middle-y'>Join</span>
          </Link>
        }

        { user &&
          <Link to='/dashboard' className='nav-element'>
            <FontAwesomeIcon icon={faRocket} color='white' size='xl' />
            <span className='nav-label fw-bold text-white translate-middle-y'>Dashboard</span>
          </Link>
        }

        { user &&
          <div className='nav-element mt-auto mb-4'>
            <FontAwesomeIcon onClick={logout} icon={faRightFromBracket} color='white' size='xl' />
            <span className='nav-label fw-bold text-white translate-middle-y'>Sign Out</span>
          </div>
        }
      </nav>
    </>
  )
}
