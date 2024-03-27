import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Array.from(formData.entries()).map(([key, value]) => ({ [key]: value }));
    console.log(data);

    fetch('/api/v1/sign-in', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        console.log('Signed in successfully!');
        navigate('/')
      }
    })
  };

  return (
    <form onSubmit={submitForm} className="card container p-4 gap-3 mt-5">
      <legend>Sign In to your account!</legend>

      <label className="form-label">Email Address:</label>
      <input className="form-control" name='email' type='email' placeholder='Email' required />

      <label className="form-label">Password</label>
      <input className="form-control" name='password' type='password' placeholder='Password' required />

      <input className="btn btn-primary bg-gradient w-25 align-self-center" type='submit' />
    </form>
  )
}
