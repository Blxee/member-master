import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCancel, faCheck, faCoins, faEnvelope, faImage, faPen, faPlus, faTrash, faUser, faX } from '@fortawesome/free-solid-svg-icons';


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
              <input className="form-control" name='description' type='text' placeholder='Description' maxLength={256} />

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
            <form onSubmit={submitForm} id='addClientForm' className="container-fluid">
              <div className='container-fluid d-flex flex-column justify-content-between align-items-start gap-3'>

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

                <label className="form-label">Picture:</label>
                <input className="form-control" name='picture' type='file' accept='image/*' />

                <label className="form-label">Email Address:</label>
                <input className="form-control" name='email' type='email' placeholder='Email' maxLength={128} />

                <label className="form-label">Phone Number:</label>
                <input className="form-control" name='phone' type='tel' placeholder='Phone' maxLength={64} />

              </div>

              <div className='container-fluid d-flex flex-column justify-content-between align-items-start gap-3'>

                <div className='form-check w-100 d-flex flex-row p-0 my-3'>
                  <label className="form-check-label me-auto">Assurance:</label>
                  <input className="form-check-input border-black ms-auto me-3" name='assurance' type='checkbox' />
                </div>

                <label className="form-label">Joined At:</label>
                <input className="form-control" name='joined' type='date' defaultValue={new Date().toISOString().slice(0, 10)} />

              </div>

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

    const input = form.querySelector('[name="picture"]');

    formData.append('picture', input.files[0])

    if (client != null) {
      fetch(`http://localhost:5000/api/subs/update/${client.id}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData,
      }).then((res) => {
        res.json().then((res) => {
          pushAlert(res.message, res.status);
          setIsEditing(false);
        });
      }).catch((err) => pushAlert(err.message));
    }
  };

  const setPayment = (months) => {
    if (client != null) {
      const formData = new FormData();
      let lastPaid = new Date(client.last_paid.getTime());
      lastPaid.setMonth(lastPaid.getMonth() + months);
      client.last_paid = lastPaid;
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
      <legend>{`${client?.first_name || 'User'}'s Profile`}</legend>

      <div className='container-fluid d-flex flex-row align-items-stretch'>
        <fieldset className='container-fluid d-flex flex-column justify-content-between align-items-start gap-3' disabled={!isEditing}>

          <div className='w-100 d-flex flex-row justify-content-between align-items-stretch p-0 my-3'>
            <div className='d-flex flex-column justify-content-evenly w-50'>
              <label className="form-label">Picture:</label>
              <input className='form-control' type='text' defaultValue={client?.picture || 'N/A'} maxLength={128} disabled />
              <input className="form-control" name='picture' type='file' accept='image/*' hidden={!isEditing} />
            </div>
            {client?.picture
              ? <img className='rounded-4' style={{ width: '10em', aspectRatio: '1/1' }} src={'http://localhost:5000' + client.picture} />
              : <FontAwesomeIcon icon={faUser} size='10x' />
            }
          </div>

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
          <input className="form-control" name='email' type='email' placeholder='Email' defaultValue={client?.email} maxLength={128} />

          <label className="form-label">Phone Number:</label>
          <input className="form-control" name='phone' type='tel' placeholder='Phone' defaultValue={client?.phone} maxLength={64} />

        </fieldset>

        <div className='vr mx-3' />
        <div className='container-fluid d-flex flex-column justify-content-between align-items-start gap-3'>

          <div className='form-check w-100 d-flex flex-row p-0 my-3'>
            <label className="form-check-label me-auto">Assurance:</label>
            <input className="form-check-input border-black ms-auto me-3" name='assurance' type='checkbox' defaultChecked={client?.assurance} disabled={!isEditing} />
          </div>

          <label className="form-label">Joined At:</label>
          <input className="form-control" name='joined' type='date' defaultValue={client.joined.toISOString().slice(0, 10)}  disabled={!isEditing} />

          <label className="form-label">Last Paid</label>
          <input className="form-control" name='last_paid' type='date' defaultValue={client.last_paid.toISOString().slice(0, 10)}  disabled={!isEditing} />

          <div className='w-100 d-flex flex-row justify-content-between'>
            <label className="form-label me-auto">Payment:</label>
            {client.payment < 0
              ? <FontAwesomeIcon className='me-2' size='xl' color='#CF0000' icon={faAngleDown} />
              : <FontAwesomeIcon className='me-2' size='xl' color='#7DCE13' icon={client.payment == 0 ? faCheck : faAngleUp} />}
            {client.payment == 0 ? '' : Math.abs(client.payment)}
          </div>

          <div className='d-flex flex-row w-100 gap-1'>
            <button type='button' onClick={() => setPayment(1)} className='btn btn-success w-50 bg-gradient px-4'>
              <FontAwesomeIcon icon={faCoins} className='me-4' />Pay Month
            </button>

            <button type='button' onClick={() => setPayment(-1)} className='btn btn-warning w-50 bg-gradient px-4'>
              <FontAwesomeIcon icon={faCoins} className='me-4' />Unpay Month
            </button>
          </div>

        </div>
      </div>

      <div className='container-fluid d-flex flex-row gap-3 mt-4 mx-2'>
        <button type='button' className={`btn btn-${isEditing ? 'warning' : 'primary'} d-inline bg-gradient px-4`} onClick={toggleEdit}>
          <FontAwesomeIcon icon={isEditing ? faCancel : faPen} className='me-4' />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>

        {isEditing &&
          <button type='submit' className='btn btn-success d-inline bg-gradient px-4'>
            <FontAwesomeIcon icon={faCheck} className='me-4' />Save
          </button>
        }

        <button type='button' className='btn btn-secondary d-inline bg-gradient px-4'>
          <FontAwesomeIcon icon={faEnvelope} className='me-4' />Message
        </button>

        <button type='button' onClick={deleteClient} className='btn btn-danger d-inline bg-gradient px-4 ms-auto'>
          <FontAwesomeIcon icon={faTrash} className='me-4' />Delete
        </button>
      </div>

    </form>
  );
}


export default function Dashboard() {
  const { pushAlert } = useContext(UserContext);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [clients, setClients] = useState([]);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate('/')
    } else {
      fetch(`http://localhost:5000/api/users/${user.id}/businesses`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          res.json().then((businesses) => {
            setBusinesses(businesses);
          });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedBusiness == null) {
      setClients([]);
      return;
    }
    fetch(`http://localhost:5000/api/subs/business/${selectedBusiness?.id}`, {
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
            const currentDate = new Date();
            client.payment = (client.last_paid.getFullYear() * 12 + client.last_paid.getMonth())
              - (currentDate.getFullYear() * 12 + currentDate.getMonth());
          });
          setClients(clients);
        });
      }
    });
  }, [user, selectedBusiness]);


  const onSelectBusinessClick = (index) => {
    setSelectedBusiness(businesses[index])
  };

  const centerElement = (event) => {
    // event.target.scrollIntoView({ behavior: 'smooth', block: 'center'});
    event.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const deleteBusiness = () => {
    fetch(`http://localhost:5000/api/businesses/${selectedBusiness?.id}/delete`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        setSelectedBusiness(null);
      }
      res.json().then((res) => {
        pushAlert(res.message, res.status);
      });
    }).catch((err) => pushAlert(err.message));
  };

  return (
    <div className='container-fluid p-3 d-flex flex-column gap-4'>
      <AddBusinessModal />
      <AddClientModal businessId={selectedBusiness?.id} />

      <div className='container-fluid d-flex flex-row align-items-start'>
        <div className='dropdown d-flex flex-row me-auto'>
          {selectedBusiness?.logo
            ? <img className='rounded-start-4 fs-5' style={{ aspectRatio: '1/1', height: '5em' }} width='%' src={'http://localhost:5000' + selectedBusiness?.logo} />
            : <div className='bg-success d-inline-block rounded-start-4 fs-5 px-2' style={{ height: '5em' }}><FontAwesomeIcon icon={faImage} size='5x' /></div>
          }

          <button style={{ height: '5em' }} className='btn btn-success bg-gradient rounded-start-0 fs-5 rounded-end-4 btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
            {selectedBusiness?.name || 'Select a business'}
          </button>

          <ul className='dropdown-menu'>
            {businesses.map(({ name }, index) => {
              return <li key={name}><div className='dropdown-item' onClick={() => onSelectBusinessClick(index)}>{name}</div></li>;
            })}
          </ul>
        </div>

        <div className='d-flex flex-column gap-2 align-items-stretch ms-auto'>
          <button
            type='button'
            className='btn btn-primary rounded-3 bg-gradient fs-5'
            data-bs-toggle='modal'
            data-bs-target='#addBusinessModal'
          >
            <FontAwesomeIcon icon={faPlus} color='white' /> Create New Business
          </button>

          {selectedBusiness &&
            <button
              type='button'
              className='btn btn-danger rounded-3 bg-gradient fs-5'
              onClick={deleteBusiness}
            >
              <FontAwesomeIcon icon={faTrash} color='white' /> Delete Business
            </button>
          }
        </div>
      </div>


      {selectedBusiness ?
        <>
          <h3>Description:</h3>
          <div className='container fs-5'>{selectedBusiness?.description}</div>

          <hr className='border-2 rounded' />

          <div className='container-flui d-flex flex-row justify-content-between'>
            <form className='d-flex'>
              <input className='form-control me-2' type='search' placeholder='Search Clients' aria-label='Search' />
              <button className='btn btn-outline-success' type='submit'>Search</button>
            </form>

            <button className='btn btn-lg btn-secondary'>
              <FontAwesomeIcon className='me-3' icon={faEnvelope} />Send Global Message
            </button>
          </div>

          <h3>Clients:</h3>
          <table className='table table-secondary table-striped table-hover rounded-3 overflow-hidden'>
            <thead>
              <tr>
                <th scope='col' style={{ width: '1%' }}></th>
                <th scope='col'>Full Name</th>
                <th scope='col'>Registration</th>
                <th scope='col'>Payment</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col' className='text-center'>Assurance</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                return (
                  <>
                    <tr style={{ verticalAlign: 'middle' }} key={client.id} role='button' onClick={centerElement} data-bs-toggle='collapse' data-bs-target={`#tableCollapse${client.id}`}>
                      <td scope='row'>{client.picture
                        ? <img className='rounded-3' style={{ width: '3em', aspectRatio: '1/1' }} src={'http://localhost:5000' + client.picture} />
                        : <FontAwesomeIcon icon={faUser} size='3x' />
                      }</td>
                      <td>{`${client.first_name} ${client.last_name}`}</td>
                      <td>{client.joined.toDateString()}</td>
                      <td>
                        {client.payment < 0
                          ? <FontAwesomeIcon className='me-2' size='xl' color='#CF0000' icon={faAngleDown} />
                          : <FontAwesomeIcon className='me-2' size='xl' color='#7DCE13' icon={client.payment == 0 ? faCheck : faAngleUp} />}
                        {client.payment == 0 ? '' : Math.abs(client.payment)}
                      </td>
                      <td>{client.email || <span className='text-danger'>N/A</span>}</td>
                      <td>{client.phone || <span className='text-danger'>N/A</span>}</td>
                      <td className='text-center'>{client.assurance
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
        </>
        :
        <h1 style={{ marginTop: '15%' }} className='text-center text-secondary'>Please select a business to see its data!</h1>
      }

      {selectedBusiness &&
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
      }

    </div>
  )
}
