import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function AddBusinessModal() {
  const { pushAlert } = useContext(UserContext);

  const submitForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('http://localhost:5000/api/businesses/add', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      // headers: { 'Content-Type': 'application/json' },
      body: data,
    }).then((res) => res.json())
      .then(({status, message}) => {
        pushAlert(message, status);
      })
      .catch((err) => pushAlert(err, 'danger'))
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
              <label className="form-label mb-0">Name:</label>
              <input className="form-control" name='name' type='text' placeholder='Name' maxLength={128} required />

              <label className="form-label mb-0">Description:</label>
              <input className="form-control" name='description' type='text' placeholder='Description' maxLength={256} required />

              <label className="form-label mb-0">Logo:</label>
              <input className="form-control" name='logo' type='file' accept='image/*' />

              <label className="form-label mb-0">Address:</label>
              <input className="form-control" name='address' type='text' placeholder='Address' maxLength={256} />
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
  const [clients, setClients] = useState([]);

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
          res.json().then((business) => {

            setBusinesses(business);
            setSelectedBusiness(business[0]);

            fetch(`http://localhost:5000/api/businesses/${business[0].id}/clients/all`, {
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
            }).then((res) => {
              if (res.ok) {
                res.json().then((clients) => {
                  setClients(clients);
                });
              }
            });

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
        <img src={'http://localhost:5000' + selectedBusiness?.logo} />
        <h1>id: {selectedBusiness?.id}</h1>
        <h1>name: {selectedBusiness?.name}</h1>
        <h1>logo: {selectedBusiness?.logo}</h1>
        <h1>owner id: {selectedBusiness?.owner_id}</h1>
      </div>


      <h3>Clients:</h3>
      <table className='table table-striped rounded-3 overflow-hidden'>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          { clients.map(({ id, email, password }) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{email}</td>
                <td>{password}</td>
              </tr>
            )
          }) }
        </tbody>
      </table>

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
