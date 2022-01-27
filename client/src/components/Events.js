import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isLoggedin, isAdminUser, requestToServer } from '../utils/utils';
import '../css/events.css';

const Events = () => {
  let [ filterBy, setFilterBy ] = useState("none");
  let [ filteredEvents, setFilteredEvents ] = useState([]);

  let [ events, setEvents ] = useState([]);
  let [ locations, setLocations ] = useState([]);
  let [ categories, setCategories ] = useState([]);

  useEffect(()=> {
    requestToServer("/apis/events/").then(data=>{ setEvents(data); setFilteredEvents(data)});
    requestToServer("/apis/locations/").then(data=>{ setLocations(data)});
    requestToServer("/apis/categories/").then(data=>{ setCategories(data)});
  }, []);

  const updateEvents = (value) => {
    let filteredEvents = events.filter((val,id)=> {
      if (filterBy === "name") {
        return val.name.includes(value);
      } else if (filterBy === "category") {
        return val.categories.includes(value);
      } else if (filterBy === "location") {
        return val.location === value;
      }
      return true;
    });
    setFilteredEvents(filteredEvents);
  }

  const filterByComp = () => {
    if (filterBy === "name") {
      return <input className="events-filterby" type="text" placeholder="Search" onChange={(e)=>updateEvents(e.target.value)}/>
    } else if (filterBy === "location" || filterBy === "category") {
      let data = filterBy === "location" ? locations : categories;
      return <select className="events-filterby" onChange={(e)=>updateEvents(e.target.value)} defaultValue="none">
               <option value="none">None</option>
               {data.map((val, id) => {
                 return <option key={"option-"+filterBy+id} value={val[filterBy]}>{val[filterBy]}</option>;
               })}
             </select>;
    }
    return null;
  }

  const deleteEvent = (id) => {
    requestToServer("/apis/events/"+id, { method: 'DELETE' });
    window.location.reload(true);
  }

  return (
    <div className="events-container">
      <h2>Events</h2>
      {events.length > 0 && <div className="events-filter">
        <label>Filter by:</label>
        <div>
          <select onChange={(e)=>{setFilterBy(e.target.value); if (e.target.value === "none") {setFilteredEvents(events)}}} defaultValue="none">
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="location">Location</option>
          </select>
          <br/>
          {filterBy !== "none" && filterByComp()}
        </div>
      </div>}
      <br/>
      <div className="events-list">
        {filteredEvents.length === 0 ? 
          <div>No events to show!</div>
          :
          <ul>
            {filteredEvents.map((val, id) =>{
              return <li key={"events-" + id}>
                       <div>{val.name}</div>
                       <Link to={"/event/" + val._id}>View Event</Link>
                       {isLoggedin() && isAdminUser() && <div className="delete-icon" onClick={()=>{deleteEvent(val._id)}}><b>&#10006;</b></div>}
                     </li>
            })}
          </ul>
        }
      </div>
    </div>
  );
}

export default Events;
