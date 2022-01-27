import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestToServer } from '../utils/utils';
import '../css/home.css';

const Home = () => {
  let navigate = useNavigate();
  let [ selectedCategories, setSelectedCategories ] = useState([]);
  let [ eventLocations, setEventLocations ] = useState([]);
  let [ categories, setCategories ] = useState([]);

  useEffect(()=> {
    requestToServer("/apis/locations/").then(data=>{ setEventLocations(data)});
    requestToServer("/apis/categories/").then(data=>{ setCategories(data)});
  }, []);

  const selectCategoryHandler = (val) => {
    let selected = [...selectedCategories];
    let selectId = selected.indexOf(val);
    if (selectId === -1) {
      selected.push(val);
    } else {
      selected.splice(selectId, 1);
    }
    setSelectedCategories(selected);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let { name, description, date, location } = (e.target.elements);
    let eventData = {
      name: name.value,
      description: description.value,
      date: Date(date.value),
      location: location.value,
      categories: selectedCategories
    }

    console.log(eventData);
    if (!eventData.name || !eventData.description || !eventData.date || !eventData.location) {
      alert("Please provide all details!");
      return;
    }

    requestToServer("/apis/events", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    }).then(data=>{
      navigate("/events");
    })
  }
  return (
    <div className="home-container">
      <form className="home-form" onSubmit={submitHandler}>
        <h2>Create Event</h2>
        <div className="home-inputs">
          <label>Title</label>
          <input type="text" name="name"/>
        </div>
        <div className="home-inputs">
          <label>Description</label>
          <input type="text" name="description"/>
        </div>
        <div className="home-inputs">
          <label>Date</label>
          <input type="date" name="date"/>
        </div>
        <div className="home-inputs">
          <label>Location</label>
          <select defaultValue="none" name="location">
            {eventLocations.map((val, id) => {
              return <option key={"location-"+id} value={val.location}>{val.location}</option>
            })}
          </select>
        </div>
        <div className="home-inputs">
          <label>Categories</label>
          <div className="home-inputs-categories">
            {categories.map((val, id)=>{
              return <div className="home-inputs-checkbox" key={"categories-"+id}>
                       <label><input type="checkbox" onChange={()=>{selectCategoryHandler(val.category)}}/ >{val.category}</label>
                     </div>
            })}
          </div>
        </div>
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
