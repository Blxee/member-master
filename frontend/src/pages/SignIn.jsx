import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

export default function SignIn() {
  const { userId, setUserId, pushAlert } = useContext(UserContext);
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

    fetch('http://localhost:5000/api/users/sign-in', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        res.json().then((json) => setUserId(json.id));
        console.log('Signed in successfully!');
        pushAlert('Welcome back!', 'primary')
        navigate('/')
      }
    });
  };

  return (
    <form onSubmit={submitForm} className="card rounded-4 shadow container w-50 p-4 gap-3 my-auto">
      <legend>Sign In to your account!</legend>

      <label className="form-label">Email Address:</label>
      <input className="form-control" name='email' type='email' placeholder='Email' required />

      <label className="form-label">Password:</label>
      <input className="form-control" name='password' type='password' placeholder='Password' required />

      <input className="btn btn-primary bg-gradient w-25 align-self-center" type='submit' />

      <div className="align-self-end">need an account? <Link to='/sign-up'>Sign Up</Link>!</div>
    </form>
  )
}
