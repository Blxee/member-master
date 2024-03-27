import { Link } from 'react-router-dom';
import './Home.css';

function Heading() {
  const style = {
    maskImage: 'linear-gradient(to right, white, transparent 50%)',
    backgroundImage: 'url(\'/membermaster-gray.svg\')',
    backgroundSize: 'contain',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <section className='card rounded-5 p-4 w-100 h-100'>
      <h1>MemberMaster</h1>
      <p>
      Seamlessly manage memberships and track client accounts hassle-free.
      </p>

      <Link to='/sign-up'>
        <button className='btn btn-primary bg-gradient'>Sign Up Now!</button>
      </Link>

      <Link to='/sign-in'>
        <button className='btn btn-outline-primary'>Sign In</button>
      </Link>
    </section>
  )
}


function Feature1() {

  return (
    <section>
      <h1>Feature 1 is great</h1>
    </section>
  )
}


function Feature2() {

  return (
    <section>
      <h1>Feature 2 is great verrryyyy</h1>
    </section>
  )
}


export default function Home() {
  return (
    <article className='p-4 bg-secondary'>
      <Heading />
      <Feature1 />
      <Feature2 />
    </article>
  );
}
