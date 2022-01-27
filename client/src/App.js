import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import User from './components/User';
import Header from './components/Header';
import Events from './components/Events';
import Event from './components/Event';
import Categories from './components/Categories';
import Locations from './components/Locations';
import { isAuthenticatedUser, isAdminUser } from "./utils/utils";
import { updateLogIn, updateIsAdmin } from "./components/actions";
import './App.css';

function App() {
  const { loggedIn, isAdmin } = useSelector(state => state.auth);
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();

  useEffect(async () => {
    const authenticated = await isAuthenticatedUser()
    const adminUser = await isAdminUser()
    dispatch(updateLogIn(authenticated))
    dispatch(updateIsAdmin(adminUser))
    setLoading(false);
  }, [])

  return (
    <div className="App">
      <div className="App-body">
        <Router>
          <Header />
          {
            loading
              ? <div>Loading...</div>
              : (<Routes>
                <Route exact path="/" element={loggedIn ? (isAdmin ? <Home /> : <User />) : <Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/events" element={<Events />} />
                <Route exact path="/event/:id" element={<Event />} />
                <Route exact path="/categories" element={<Categories />} />
                <Route exact path="/locations" element={<Locations />} />
              </Routes>)
          }
        </Router>
      </div>
    </div>
  );
}

export default App;
