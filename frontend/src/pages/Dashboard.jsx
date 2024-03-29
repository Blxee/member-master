import { UserContext } from '../App';
import { useContext, useEffect } from 'react';

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/current', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        res.json().then((json) => setUser(json));
      }
    });
  }, []);

  return (
    <div className='w-100 h-auto d-flex flex-row'>

      <div className='dropdown'>
        <button className='btn btn-lg btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>hello drop</button>

        <ul className='dropdown-menu'>
          <li><div className='dropdown-item'>first item</div></li>
          <li><div className='dropdown-item'>second item</div></li>
          <li><hr className='dropdown-divider' /></li>
          <li><div className='dropdown-item'>third item</div></li>
        </ul>
      </div>

      <h1 className='flex-grow-1'>hello from dashboard</h1>
      <h1 className='position-sticky top-0 align-self-start'>hello from dashboard</h1>
    </div>
  )
}
