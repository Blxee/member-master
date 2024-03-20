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
    <form onSubmit={submitForm}>
      <legend>Create a new account!</legend>
      <input name='email' type='email' placeholder='Email' required />
      <input name='password' type='password' placeholder='Password' required />
      <input type='submit' />
    </form>
  )
}
