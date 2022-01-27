import { useState, useEffect } from "react";
import AuthHOC from "./AuthHOC";
import { requestToServer } from '../utils/utils';
import '../css/categories.css';

const Categories = () => {
  let [ addCategory, setAddCategory] = useState('');
  let [ categories, setCategories ] = useState(null);
  let [ events, setEvents] = useState(null);
  let categoryEventObj = {};

  useEffect(()=> {
    requestToServer("/apis/categories").then(data=>{ setCategories(data) });
    requestToServer("/apis/events").then(data=>{ setEvents(data) });
  }, []);

  const calcNumOfEvents = (cat) => {
    let count = 0;
    if (events !== null) {
      events.map((val) => {
        if (val.categories.includes(cat)) {
          count += 1;
        }
      });
    }
    categoryEventObj[cat] = count;
    return count;
  }

  const updateCategory = (e) => {
    setAddCategory(e.target.value);
  }

  const clickHandler = () => {
    requestToServer("/apis/categories", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({category: addCategory})
    }).then(data=>{
      window.location.reload(true);
    });
  }

  const deleteCategory = (id, value) => {
    if (categoryEventObj[value] > 0) {
      alert("This category is assigned to event(s)");
    } else {
      requestToServer("/apis/categories/"+id, { method: 'DELETE' });
      window.location.reload(true);
    }
  }

  return (
    <div className="categories-container">
      <div className="categories-add">
        <label>Add Category</label>
        <input type="text" onChange={updateCategory}/>
      </div>
      <button className="btn" onClick={clickHandler}>Add</button>
      <div className="categories-list">
        <h2>Categories</h2>
        {!categories || categories.length === 0 ? 
          <div>No categories added yet!</div>
          :
          <ul>
            {categories.map((val, id) =>{
              return <li key={"categories-" + id}>
                       <div>{val.category}</div>
                       <div>{calcNumOfEvents(val.category) + " Event(s)"}</div>
                       <div className="delete-btn" onClick={()=>{deleteCategory(val._id, val.category)}}><b>&#10006;</b></div>
                     </li>
            })}
          </ul>
        }
      </div>
    </div>
  );
}

export default AuthHOC(Categories, { authRequired: true });