import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const { userId, pushAlert } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  });

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => data[key] = value );

    fetch('http://localhost:5000/api/users/sign-up', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        console.log('Signed up successfully!');
        pushAlert('Welcome to MemberMaster!', 'primary')
        navigate('/')
      }
    });
  };

  return (
    <form onSubmit={submitForm} className="card position-relative rounded-4 shadow container w-50 p-4 gap-3 my-auto">
      <img className='position-absolute top-0 end-0 m-4' width='10%' srcSet='/membermaster-gray.svg' alt='MemberMaster logo' />

      <legend>Join MemberMaster:</legend>

      <label className="form-label">Email Address:</label>
      <input className="form-control" name='email' type='email' placeholder='Email' required />

      <label className="form-label">Password:</label>
      <input className="form-control" name='password' type='password' placeholder='Password' required />

      <label className="form-label">Confirm Password:</label>
      <input className="form-control" name='password2' type='password' placeholder='Password' required />

      <label className="form-label">Phone Number:</label>
      <input className="form-control" name='phone' type='tel' placeholder='Phone Number' required />

      <input className="btn btn-primary bg-gradient w-25 align-self-center" type='submit' />

      <div className="align-self-end">already have an account? <Link to='/sign-in'>Sign In</Link>!</div>
    </form>
  )
}
