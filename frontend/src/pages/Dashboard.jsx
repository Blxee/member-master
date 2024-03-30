import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function AddBusinessModal() {
  const submitForm = (event) => {
    alert('creating business')
  };

  return (
    <div className='modal' id='addBusinessModal' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <legend className='modal-title'>Add a new business</legend>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form id='addBusinessForm' onSubmit={submitForm} className="d-flex flex-column gap-3 align-items-start">
              <label className="form-label mb-0">Email Address:</label>
              <input className="form-control" name='name' type='text' placeholder='Name' required />

              <label className="form-label mb-0">Password:</label>
              <input className="form-control" name='password' type='password' placeholder='Password' required />
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
            <button type='submit' className='btn btn-primary' form='addBusinessForm'>Add Business</button>
          </div>
        </div>
      </div>
    </div>
  );
}


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


  const onSelectBusinessClick = (index) => {
    setSelectedBusiness(businesses[index])
  };

  return (
    <div className='w-100 container-fluid text-center'>
      <AddBusinessModal />

      <div className='row'>
        <div className='col'>
          <div className='dropdown'>
            <button className='btn btn-lg btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>{selectedBusiness?.name || 'Select a business'}</button>

            <ul className='dropdown-menu'>
              {businesses.map(({ name }, index) => {
                return <li key={name}><div className='dropdown-item' onClick={() => onSelectBusinessClick(index)}>{name}</div></li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      <hr className='border-2 rounded' />

      <div className='row'>
        <h1>id: {selectedBusiness?.id}</h1>
        <h1>name: {selectedBusiness?.name}</h1>
        <h1>logo: {selectedBusiness?.logo}</h1>
        <h1>owner id: {selectedBusiness?.owner_id}</h1>
      </div>

      <button
        type='button'
        style={{ aspectRatio: '1/1' }}
        className='btn btn-primary rounded-circle m-3 position-fixed bottom-0 end-0'
        data-bs-toggle='modal'
        data-bs-target='#addBusinessModal'
      >
        <FontAwesomeIcon
          icon={faPlus} size='2x' color='white' />
      </button>

    </div>
  )
}
