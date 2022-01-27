import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import User from './components/User';
import Header from './components/Header';
import Events from './components/Events';
import Event from './components/Event';
import Categories from './components/Categories';
import Locations from './components/Locations';
import { isLoggedin, isAdminUser } from './utils/utils';

function App() {
  let isLoggedIn = isLoggedin();

  return (
    <div className="App">
      <div className="App-body">
        <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={isLoggedIn ? (isAdminUser() ? <Home/> : <User/>) : <Login/>} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/events" element={<Events/>} />
            <Route exact path="/event/:id" element={<Event/>} />
            <Route exact path="/categories" element={isLoggedIn && isAdminUser() ? <Categories/> : <Navigate to="/"/>} />
            <Route exact path="/locations" element={isLoggedIn && isAdminUser() ? <Locations/> : <Navigate to="/"/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
