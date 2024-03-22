import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Nav from './Nav';
import Footer from './Footer';

const router = createBrowserRouter([{
  path: '/',
  element: (
    <div id='main-container' className='d-flex flex-column'>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  ),
  children: [
    { path: '', element: <Home /> },
    { path: 'sign-up', element: <SignUp /> },
    { path: 'sign-in', element: <SignIn /> },
  ]
}]);

function App() {

  return <RouterProvider router={router} fallbackElement={<h1>loading</h1>} />;
}

export default App
