import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext, useEffect, useState } from 'react';

export default function Dashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if the user is not logged in, redirect to '/'
    if (user == null) {
      navigate('/')
    } else {
      fetch(`http://localhost:5000/api/users/${user.id}/businesses`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            setBusinesses(json);
            setSelectedBusiness(json[0]);
          });
        }
      });
    }
  }, [user]);

  return (
    <div className='w-100 h-auto d-flex flex-row'>
      <div className='dropdown'>
        <button className='btn btn-lg btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>{selectedBusiness?.name || 'Select a business'}</button>

        <ul className='dropdown-menu'>
          {businesses.map(({ name }) => {
            return <li key={name}><div className='dropdown-item'>{ name }</div></li>;
          })}
        </ul>
      </div>

      <h1 className='flex-grow-1'>hello from dashboard</h1>
      <h1 className='position-sticky top-0 align-self-start'>hello from dashboard</h1>
    </div>
  )
}
