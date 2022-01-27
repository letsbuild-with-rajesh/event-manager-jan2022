import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { requestToServer } from '../utils/utils';
import '../css/locations.css';

const Locations = () => {
  let [ addLocation, setAddLocation] = useState('');
  let [ locations, setLocations] = useState(null);
  let [ events, setEvents] = useState(null);
  let locationEventObj = {};

  useEffect(()=> {
    requestToServer("/apis/locations").then(data=>{ setLocations(data) });
    requestToServer("/apis/events").then(data=>{ setEvents(data) });
  }, []);

  const calcNumOfEvents = (loc) => {
    let count = 0;
    if (events !== null) {
      events.map((val) => {
        if (val.location === loc) {
          count += 1;
        }
      });
    }
    locationEventObj[loc] = count;
    return count;
  }

  const updateLocation = (e) => {
    setAddLocation(e.target.value);
  }

  const clickHandler = () => {
    requestToServer("/apis/locations", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({location: addLocation})
    }).then(data=>{
      window.location.reload(true);
    });
  }

  const deleteLocation = (id, value) => {
    if (locationEventObj[value] > 0) {
      alert("This location is assigned to event(s)");
    } else {
      requestToServer("/apis/locations/"+id, { method: 'DELETE' });
      window.location.reload(true);
    }
  }

  return (
    <div className="locations-container">
      <div className="locations-add">
        <label>Add Location</label>
        <input type="text" onChange={updateLocation}/>
      </div>
      <button className="btn" onClick={clickHandler}>Add</button>
      <div className="locations-list">
        <h2>Locations</h2>
        {!locations || locations.length === 0 ? 
          <div>No locations added yet!</div>
          :
          <ul>
            {locations.map((val, id) =>{
              return <li key={"locations-" + id}>
                       <div>{val.location}</div>
                       <div>{calcNumOfEvents(val.location) + " Event(s)"}</div>
                       <div className="delete-btn" onClick={()=>{deleteLocation(val._id, val.location)}}><b>&#10006;</b></div>
                     </li>
            })}
          </ul>
        }
      </div>
    </div>
  );
}

export default Locations;
