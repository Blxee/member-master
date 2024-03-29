import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Nav from './Nav';
import Footer from './Footer';
import { createContext, useEffect, useState } from 'react';
import Alert from './Alert';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';


const router = createBrowserRouter([{
  path: '/',
  element: (
    <div id='main-container' className='d-flex flex-row flex-md-column'>
      <div className='d-flex flex-row'>
        <Nav />
        <div className='flex-grow-1 d-flex flex-column'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  ),
  children: [
    { path: '', element: <Home /> },
    { path: 'sign-up', element: <SignUp /> },
    { path: 'sign-in', element: <SignIn /> },
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'profile/:userId', element: <Profile /> },
  ]
}]);


export const UserContext = createContext();


function App() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [alertVisible, setAlertVisible] = useState(true);

  const pushAlert = (content, type) => {
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 4000);
    setAlert(<Alert type={type} show={alertVisible}>{content}</Alert>);
  };

  useEffect((user) => {
    if (user == null) {
      fetch('http://localhost:5000/api/users/current', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          res.json().then((json) => setUser(json));
        }
      });
    }
  }, [alert]);

  return (
    <UserContext.Provider value={{ user, setUser, pushAlert }}>
      <RouterProvider router={router} fallbackElement={<h1>loading</h1>} />
      {alert}
    </UserContext.Provider>
  );
}

export default App
