import { Link } from 'react-router-dom';
import './Home.css';

function Heading() {

  return (
    <section className='card container-fluid shadow rounded-4 p-4 w-100 h-100'>
      <div className='row w-100 h-100'>
        <div className='col w-100 h-100 d-flex flex-column justify-content-between'>
          <img className='mx-auto' style={{filter: 'drop-shadow(0px 0.3em 4px black)'}} width='30%' srcSet='/membermaster.svg' alt='MemberMaster logo' />

          <h1 className='mx-auto'>MemberMaster</h1>

          <p>
            Seamlessly manage memberships and track client accounts hassle-free.
          </p>

          <hr/>

          <div className='d-flex flex-row justify-content-between'>
            <Link className='w-50 p-2' to='/sign-up'>
              <button className='btn btn-primary bg-gradient w-100'>
                Sign Up Now!
              </button>
            </Link>

            <Link className='w-50 p-2' to='/sign-in'>
              <button className='btn btn-outline-primary w-100'>Sign In</button>
            </Link>
          </div>

        </div>
        <div className='col w-100 h-100 d-flex'>
          <img width='90%' className='m-auto' srcSet='/sports.svg' alt='MemberMaster logo' />
        </div>
      </div>
    </section>
  )
}


function Feature1() {

  return (
    <section className='card container-fluid shadow rounded-4 p-4 w-100 h-100'>
      <div className='row w-100 h-100'>
        <div className='col w-100 h-100 d-flex'>
          <img width='90%' className='m-auto' srcSet='/hiking.svg' alt='MemberMaster logo' />
        </div>
        <div className='col w-100 h-100 d-flex flex-column justify-content-between'>
          <img className='mx-auto' style={{filter: 'drop-shadow(0px 0.3em 4px black)'}} width='30%' srcSet='/membermaster.svg' alt='MemberMaster logo' />

          <h1 className='mx-auto'>MemberMaster</h1>

          <p>
            Seamlessly manage memberships and track client accounts hassle-free.
          </p>

          <hr/>

          <div className='d-flex flex-row justify-content-between'>
            <Link className='w-50 p-2' to='/sign-up'>
              <button className='btn btn-primary bg-gradient w-100'>
                Sign Up Now!
              </button>
            </Link>

            <Link className='w-50 p-2' to='/sign-in'>
              <button className='btn btn-outline-primary w-100'>Sign In</button>
            </Link>
          </div>

        </div>
      </div>
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
    <article className='p-4'>
      <Heading />
      <Feature1 />
      <Feature2 />
    </article>
  );
}
