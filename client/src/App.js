import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { getAuthDetails, getUserDetails } from "./utils/utils";
import { updateAuthDetails, updateUserDetails } from "./components/actions";
import './App.css';

function App() {
  const { loggedIn, isAdmin } = useSelector(state => state.auth);
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();

  useEffect(async () => {
    const authDetails = await getAuthDetails()
    const userDetails = await getUserDetails()

    dispatch(updateAuthDetails(authDetails))
    dispatch(updateUserDetails(userDetails))

    setLoading(false);
  }, [])

  return (
    <div className="App">
      <div className="App-body">
        <Router>
          <Header />
          {
            loading
              ? <div/>
              : (<Routes>
                <Route exact path="/" element={loggedIn ? (isAdmin ? <Home /> : <User />) : <Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/events" element={<Events />} />
                <Route exact path="/event/:id" element={<Event />} />
                <Route exact path="/categories" element={loggedIn && isAdmin ? <Categories /> : <Navigate to="/" />} />
                <Route exact path="/locations" element={loggedIn && isAdmin ? <Locations /> : <Navigate to="/" />} />
                <Route exact path="*" element={<Navigate to="/" />} />
              </Routes>)
          }
        </Router>
      </div>
    </div>
  );
}

export default App;
