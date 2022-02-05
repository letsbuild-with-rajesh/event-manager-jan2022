import { useState, useEffect } from "react";
import AuthHOC from "./AuthHOC";
import { requestToServer } from '../utils/utils';
import '../css/locations.css';

const Locations = () => {
  const [ addLocation, setAddLocation] = useState('');
  const [ locations, setLocations] = useState(null);
  const [ events, setEvents] = useState(null);

  const [ loading, setLoading ] = useState(true)

  let locationEventObj = {};

  useEffect(()=> {
    async function init() {
      await requestToServer("/apis/locations").then(data=>{ setLocations(data) });
      await requestToServer("/apis/events").then(data=>{ setEvents(data) });
      setLoading(false);
    }
    init();
  }, []);

  const calcNumOfEvents = (loc) => {
    let count = 0;
    if (events !== null) {
      for (let i = 0; i < events.length; i++) {
        if (events[i].location === loc) {
          count += 1;
        }
      }
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

  const deleteLocation = async (id, value) => {
    if (locationEventObj[value] > 0) {
      alert("This location is assigned to event(s)");
    } else {
      await requestToServer("/apis/locations/"+id, { method: 'DELETE' });
      window.location.reload(true);
    }
  }

  if (loading) {
    return <div/>
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
          <div>No locations to show!</div>
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

export default AuthHOC(Locations, { authRequired: true, authAsAdmin: true });
