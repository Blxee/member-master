import { Link } from 'react-router-dom';
import './Home.css';
import { useContext } from 'react';
import { UserContext } from "../App";

function Heading() {
  const { user } = useContext(UserContext);

  return (
    <section className='card shadow rounded-4 p-4 w-100 h-100'>
      <div className='row w-100 h-100'>
        <div className='col w-100 h-100 d-flex flex-column justify-content-between'>
          <img className='mx-auto' width='30%' srcSet='/membermaster.svg' alt='MemberMaster logo' />

          <h1 className='mx-auto'>MemberMaster</h1>

          <h1 className='mx-auto display-block w-75 text-center'>Managing Clients Has Never Been <u>Easier</u></h1>
          <p>
            Seamlessly manage memberships and track client accounts hassle-free.
          </p>

          <hr className='border-3'/>

          <div className='d-flex flex-row justify-content-between'>
            { user
              ?
              <Link className='w-100 p-2' to='/dashboard'>
                <button className='btn btn-primary bg-gradient w-100'>Go To Dashboard</button>
              </Link>
              : 
              <>
                <Link className='w-50 p-2' to='/sign-up'>
                  <button className='btn btn-primary bg-gradient w-100'>Sign Up Now!</button>
                </Link>

                <Link className='w-50 p-2' to='/sign-in'>
                  <button className='btn btn-outline-primary w-100'>Sign In</button>
                </Link>
              </>
            }
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
    <section className='card shadow rounded-4 p-4 w-100 h-100'>
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
    <section className='card shadow px-0 py-3 rounded-4 w-100 h-100 overflow-hidden'>

      <h1 className='d-flex flex-column w-100 mx-0 py-3 justify-content-center text-center'>Designed with convienience in mind</h1>

      <div className='row w-100 flex-grow-1 mx-0 p-5 gap-5' style={{backgroundColor: 'lightgray'}}>
        <div className='card p-3 col rounded-5 justify-content-between h-100'>
          <img src='/business_automation.png' className='mx-auto' width='70%' />
          <h4 className='text-center mt-3'>Automated transaction</h4>
          <hr className='border-2' />
          <p>
            clients can subscribe to your business online for convienience.
          </p>
        </div>
        <div className='card p-3 col rounded-5 justify-content-between h-100'>
          <img src='/bar_graph.png' className='mx-auto' width='70%' />
          <h4 className='text-center mt-3'>Clear and Consice</h4>
          <hr className='border-2' />
          <p>
            track your business progress with clear graphs and various tools.
          </p>
        </div>
        <div className='card p-3 col rounded-5 justify-content-between h-100'>
          <img src='/folder_gear.png' className='mx-auto' width='70%' />
          <h4 className='text-center mt-3'>Never Lose Data</h4>
          <hr className='border-2' />
          <p>
            with everything stored in the cloud and managed by you, say goodbye to data losses.
          </p>
        </div>
        <div className='card p-3 col rounded-5 justify-content-between h-100'>
          <img src='/website_layout.png' className='mx-auto' width='70%' />
          <h4 className='text-center mt-3'>Easy Layout</h4>
          <hr className='border-2' />
          <p>
            manage everything from one place with a super easy dashboard.
          </p>
        </div>
      </div>

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
