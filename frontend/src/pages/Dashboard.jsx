import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faCheck, faCoins, faPen, faPlus, faTrash, faUser, faX } from '@fortawesome/free-solid-svg-icons';


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
      .then(({ status, message }) => {
        pushAlert(message, status);
        event.target.reset();
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
            <button type='submit' className='btn btn-primary' form='addBusinessForm' data-bs-dismiss='modal'>Add Business</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function AddClientModal({ businessId }) {
  const { pushAlert } = useContext(UserContext);

  const submitForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(`http://localhost:5000/api/subs/add/${businessId}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: data,
    }).then((res) => res.json())
      .then(({ status, message }) => {
        pushAlert(message, status);
        event.target.reset();
      })
      .catch((err) => pushAlert(err, 'danger'))
  };

  return (
    <div className='modal' id='addClientModal' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <legend className='modal-title'>Add a new client</legend>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={submitForm} id='addClientForm' className="container w-100 p-4 mx-auto my-3">
              <label className="form-label mb-0">Picture:</label>
              <input className="form-control" name='picture' type='file' accept='image/*' />

              <div className='container-fluid'>
                <div className='row row-cols-2'>
                  <div className='col'>
                    <label className='form-label'>First Name:</label>
                    <input className='form-control' placeholder='First Name' type='text' name='first_name' maxLength={64} required />
                  </div>
                  <div className='col'>
                    <label className='form-label'>Last Name:</label>
                    <input className='form-control' placeholder='Last Name' type='text' name='last_name' maxLength={64} required />
                  </div>
                </div>
              </div>

              <label className="form-label">Email Address:</label>
              <input className="form-control" name='email' type='email' placeholder='Email' maxLength={128} />

              <label className="form-label">Phone Number:</label>
              <input className="form-control" name='phone' type='tel' placeholder='Phone' maxLength={64} />

              <label className="form-label">Joined At:</label>
              <input className="form-control" name='joined' type='date' defaultValue={new Date().toISOString().slice(0, 10)} />

              <div className='form-check w-100 d-flex flex-row p-0 my-3'>
                <label className="form-check-label me-auto">Assurance:</label>
                <input className="form-check-input border-black ms-auto me-3" name='assurance' type='checkbox' />
              </div>

              <label className="form-label mb-0">Documents:</label>
              <input className="form-control" name='files[]' type='file' multiple/>

            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
            <button type='submit' className='btn btn-primary' form='addClientForm' data-bs-dismiss='modal'>Add Client</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function UserInfo({ client }) {
  const { pushAlert } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef();

  const toggleEdit = () => {
    setIsEditing((editing) => {
      if (editing) {
        formRef.current.reset();
      }
      return !editing;
    });
  };

  const updateClient = (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData();

    form.querySelectorAll('input').forEach(input => {
      if (input.value !== input.defaultValue) {
        formData.append(input.name, input.value);
      }
    });

    if (client != null) {
      fetch(`http://localhost:5000/api/subs/update/${client.id}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData,
      }).then((res) => {
        res.json().then((res) => {
          pushAlert(res.message, res.status);
        });
      }).catch((err) => pushAlert(err.message));
    }
  };

  const payMonth = () => {
    if (client != null) {
      const formData = new FormData();
      let lastPaid = new Date(client.last_paid.getTime());
      lastPaid.setMonth(lastPaid.getMonth() + 1);
      lastPaid = lastPaid.toISOString().slice(0, 10);
      formData.append('last_paid', lastPaid);

      fetch(`http://localhost:5000/api/subs/update/${client.id}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData,
      }).then((res) => {
        res.json().then((res) => {
          pushAlert(res.message, res.status);
        });
      }).catch((err) => pushAlert(err.message));
    }
  };

  const deleteClient = () => {
    if (client != null) {
      fetch(`http://localhost:5000/api/subs/delete/${client.id}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
      }).then((res) => {
        res.json().then((res) => {
          pushAlert(res.message, res.status);
        });
      }).catch((err) => pushAlert(err.message));
    }
  };

  return (
    <form ref={formRef} onSubmit={updateClient} className="card rounded-4 bg-light shadow container w-100 p-4 mx-auto my-3">
      <legend>User Profile</legend>

      <fieldset className='container-fluid d-flex flex-column align-items-start gap-3' disabled={!isEditing}>
        <img src={'http://localhost:5000' + client?.picture} />
        <label className="form-label mb-0">Picture:</label>
        <input className="form-control" name='picture' type='file' accept='image/*' hidden={!isEditing} />

        <div className='container-fluid'>
          <div className='row row-cols-2'>
            <div className='col'>
              <label className='form-label'>First Name:</label>
              <input className='form-control' placeholder='First Name' type='text' name='first_name' defaultValue={client?.first_name} maxLength={64} required />
            </div>
            <div className='col'>
              <label className='form-label'>Last Name:</label>
              <input className='form-control' placeholder='Last Name' type='text' name='last_name' defaultValue={client?.last_name} maxLength={64} required />
            </div>
          </div>
        </div>

        <label className="form-label">Email Address:</label>
        <input className="form-control" name='email' type='email' placeholder='Email' defaultValue={client.email} maxLength={128} />

        <label className="form-label">Phone Number:</label>
        <input className="form-control" name='phone' type='tel' placeholder='Phone' defaultValue={client.phone} maxLength={64} />

        <label className="form-label">Joined At:</label>
        <input className="form-control" name='joined' type='date' defaultValue={client.joined.toISOString().slice(0, 10)} />

        <label className="form-label">Last Paid</label>
        <input className="form-control" name='last_paid' type='date'  defaultValue={client.last_paid.toISOString().slice(0, 10)} />

        <div className='form-check w-100 d-flex flex-row p-0 my-3'>
          <label className="form-check-label me-auto">Assurance:</label>
          <input className="form-check-input border-black ms-auto me-3" name='assurance' type='checkbox' defaultChecked={client?.assurance} />
        </div>

      </fieldset>

      <button type='button' onClick={payMonth} className='btn btn-success bg-gradient px-4'>
        <FontAwesomeIcon icon={faCoins} className='me-4' />Pay Month
      </button>

      <div className='container-fluid d-flex flex-row mt-4 mx-2'>
        <button type='button' className={`btn btn-${isEditing ? 'warning' : 'primary'} d-inline bg-gradient px-4`} onClick={toggleEdit}>
          <FontAwesomeIcon icon={isEditing ? faCancel : faPen} className='me-4' />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>

        { isEditing &&
          <button type='submit' className='btn btn-success d-inline bg-gradient px-4 ms-2'>
            <FontAwesomeIcon icon={faCheck} className='me-4' />Save
          </button>
        }

        <button type='button' onClick={deleteClient} className='btn btn-danger d-inline bg-gradient px-4 ms-auto'>
          <FontAwesomeIcon icon={faTrash} className='me-4' />Delete
        </button>
      </div>

    </form>
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

            fetch(`http://localhost:5000/api/subs/business/${business[0].id}`, {
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
            }).then((res) => {
              if (res.ok) {
                res.json().then((clients) => {
                  clients.forEach((client) => {
                    client.joined = new Date(client.joined);
                    client.last_paid = new Date(client.last_paid);
                    client.assurance = Boolean(client.assurance);
                  });
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

  const centerElement = (event) => {
    // event.target.scrollIntoView({ behavior: 'smooth', block: 'center'});
    event.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className='w-100 container-fluid text-center'>
      <AddBusinessModal />
      <AddClientModal businessId={selectedBusiness?.id} />

      <div className='row'>
        <div className='col'>
          <div className='dropdown'>
            <img className='rounded-start-4' style={{ aspectRatio: '1/1' }} width='%' src={'http://localhost:5000' + selectedBusiness?.logo} />

            <button className='btn btn-lg rounded-start-0 btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              {selectedBusiness?.name || 'Select a business'}
            </button>

            <ul className='dropdown-menu'>
              {businesses.map(({ name }, index) => {
                return <li key={name}><div className='dropdown-item' onClick={() => onSelectBusinessClick(index)}>{name}</div></li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      <button
        type='button'
        style={{ aspectRatio: '1/1' }}
        className='btn btn-primary rounded-circle'
        data-bs-toggle='modal'
        data-bs-target='#addBusinessModal'
      >
        <FontAwesomeIcon
          icon={faPlus} size='2x' color='white' />
      </button>

      <div className='row'>
        <img className='rounded-circle' style={{ aspectRatio: '1/1' }} src={'http://localhost:5000' + selectedBusiness?.logo} />
        <h1>id: {selectedBusiness?.id}</h1>
        <h1>name: {selectedBusiness?.name}</h1>
        <h1>logo: {selectedBusiness?.logo}</h1>
        <h1>owner id: {selectedBusiness?.owner_id}</h1>
      </div>

      <hr className='border-2 rounded' />

      <h3>Clients:</h3>
      <table className='table table-secondary table-striped table-hover rounded-3 overflow-hidden'>
        <thead>
          <tr>
            <th scope='col' style={{width: '1%'}}></th>
            <th scope='col'>Full Name</th>
            <th scope='col'>Registration</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Assurance</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <>
                <tr style={{verticalAlign: 'middle'}} key={client.id} role='button' onClick={centerElement} data-bs-toggle='collapse' data-bs-target={`#tableCollapse${client.id}`}>
                  <td scope='row'>{ client.picture
                    ? <img className='rounded-3' style={{width: '3em'}} src={'http://localhost:5000' + client.picture} />
                    : <FontAwesomeIcon icon={faUser} size='3x' />
                  }</td>
                  <td>{`${client.first_name} ${client.last_name}`}</td>
                  <td>{client.joined.toDateString()}</td>
                  <td>{client.email || <span className='text-danger'>N/A</span>}</td>
                  <td>{client.phone || <span className='text-danger'>N/A</span>}</td>
                  <td>{client.assurance
                    ? <FontAwesomeIcon size='xl' color='#7DCE13' icon={faCheck} />
                    : <FontAwesomeIcon size='xl' color='#B80000' icon={faX} />
                  }</td>
                </tr>
                <td colSpan='100%' className='collapse bg-secondary' id={`tableCollapse${client.id}`} key={-client.id}>
                  <UserInfo client={client} />
                </td>
              </>
            )
          })}
        </tbody>
      </table>

      <button
        type='button'
        style={{ aspectRatio: '1/1' }}
        className='btn btn-primary rounded-circle m-3 position-fixed bottom-0 end-0'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <FontAwesomeIcon
          icon={faPlus} size='2x' color='white' />
      </button>

    </div>
  )
}
