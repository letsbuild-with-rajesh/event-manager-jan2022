import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isLoggedin, requestToServer } from '../utils/utils';
import '../css/event.css';

const Event = (props) => {
  let { id } = useParams();
  let [ event, setEvent ] = useState(null);
  let [ comment, setComment ] = useState('');
    
  useEffect(()=> {
    requestToServer("/apis/events/"+id).then(data=>{ setEvent(data)});
  }, []);

  const updateComment = (e) => {
    setComment(e.target.value);
  }

  const clickHandler = () => {
    let commentData = {
      comment,
      commentBy: localStorage.getItem("name")
    }
    console.log(commentData);
    requestToServer("/apis/events/"+id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    }).then(data=>{
      window.location.reload(true);
    });
  }
  
  return event === null ? null : (
    <div className="event-container">
      <div className="event-details">
        <h2>{event.name}</h2>
        <div>{event.description}</div>
        <br/>
        <b>Location</b>
        <div>{event.location}</div>
        <br/>
        <b>Categories</b>
        <ol>
          {event.categories.map((val, id)=>{
            return <li key={"event-category-"+id}>{val}</li>
          })}
        </ol>
        <br/>
        <b>Date</b>
        <div>{event.date}</div>
      </div>
      <div className="event-comments">
        <h2>Comments</h2>
        {event.comments.map((val, id)=>{
          return <div className="event-comment" key={"event-comment-"+id}>{val.comment + " by "}<b>{val.commentBy}</b></div>
        })}
        {isLoggedin() && <><div className="event-comments-add">
          <label>Add Comment</label>
          <input type="text" onChange={updateComment}/>
        </div>
        <button className="btn" onClick={clickHandler}>Add</button></>}
      </div>
    </div>
  );
}

export default Event;
