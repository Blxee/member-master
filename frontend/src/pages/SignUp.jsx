export default function SignUp() {
  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Array.from(formData.entries()).map(([key, value]) => ({ [key]: value }));
    console.log(data);

    fetch('/api/v1/sign-in', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        console.log('Signed in successfully!');
        window.location.pathname = '/'; // redirect to homepage
      }
    })
  };

  return (
    <form onSubmit={submitForm} className="card container w-50 p-4 gap-3 my-auto">
      <legend>Join MemberMaster:</legend>

      <label className="form-label">Email Address:</label>
      <input className="form-control" name='email' type='email' placeholder='Email' required />

      <label className="form-label">Password:</label>
      <input className="form-control" name='password1' type='password' placeholder='Password' required />

      <label className="form-label">Confirm Password:</label>
      <input className="form-control" name='password2' type='password' placeholder='Password' required />

      <label className="form-label">Phone Number:</label>
      <input className="form-control" name='phone' type='tel' placeholder='Phone Number' required />

      <input className="btn btn-primary bg-gradient w-25 align-self-center" type='submit' />
    </form>
  )
}
