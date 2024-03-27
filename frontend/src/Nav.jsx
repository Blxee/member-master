import { faHouseChimney, faRightFromBracket, faRocket, faUser } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { UserContext } from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
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
        <img className='mt-4' style={{filter: 'contrast(300%)'}} src='/membermaster-gray.svg' alt='MemberMaster logo' width='80%' />

        <Link to='/' className='nav-element'>
          <FontAwesomeIcon icon={faHouseChimney} color='white' size='xl' />
          <span className='nav-label'>Home</span>
        </Link>

        <Link to='/sign-in' className='nav-element'>
          <button>Sign In</button>
        </Link>

        <Link to='/sign-up' className='nav-element'>
          <button>Sign Up</button>
        </Link>

        { user &&
          <Link to='/dashboard' className='nav-element'>
            <FontAwesomeIcon icon={faRocket} color='white' size='xl' />
          </Link>
        }

        { user &&
          <FontAwesomeIcon onClick={logout} icon={faRightFromBracket} color='white' size='xl' />
        }

        { user &&
          <Link to='/profile/my___udddd' className='nav-element mt-auto mb-5'>
            <FontAwesomeIcon icon={faUser} color='white' size='xl' />
          </Link>
        }
      </nav>
    </>
  )
}
