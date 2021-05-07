import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';

import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { AuthContext } from './contexts/AuthContextProvider'
import AdminPage from './pages/AdminPage';
import { getToken } from './services/localStorageService'



const publicRoutes = [
  {
    path:"/",
    component:Homepage
  },
  {
    path:"/login-regis",
    component:LoginPage
  }
]

const privateRoutes = [
  {
    path:"/",
    component:Homepage
  },
  {
    path:"/profile",
    component:ProfilePage
  },
  {
    path:"/admin",
    component:AdminPage
  }
]

// const adminRoutes = [
//   {
//     path:"/admin",
//     component:AdminPage
//   }
// ]

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const [role, setRole] = useState("")

  // useEffect(async () => {
  //   await decodeToken();
  // }, []);

  // async function decodeToken() {
  //   try {
  //     const decodedUserData = await jwt_decode(getToken());
  //     setRole(decodedUserData.roleAdmin);
  //     console.log(role)
  //   } catch(err) {
  //     console.log("decodedError: " + err)
  //   }
  // };  

  return (
    <BrowserRouter>
      <Switch>
        {!isAuthenticated && publicRoutes.map((element, index) => (
            <Route
              key={index}
              exact path={element.path}
              component={element.component}
            />
          ))
        }
        {isAuthenticated && privateRoutes.map((element, index) => (
            <Route
              key={index}
              exact path={element.path}
              component={element.component}
            />
          ))
        }
        {/* {isAuthenticated && (role === "ADMIN") && adminRoutes.map((element, index) => (
            <Route
              key={index}
              exact path={element.path}
              component={element.component}
            />
          ))
        } */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
