import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import './Make_Post.css';
// import logo from './logo.svg';
//import './About.css';

const Make_Post = (props) => {

  const [data, setData] = useState([]);

  useEffect( () => {
    axios.get("https://api.mockaroo.com/api/36d63960?count=10&key=5296eab0")
    .then ((response) => {
      setData(response.data);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
    })
    
  }, []);

  /*const list = [];
  for(const x of data){
    list.push(<li><img src="/content-img.jpg" alt="temp"></img></li>)
    list.push(<br/>)
    list.push(<li> {x.song_name} <br/>  {x.singer}</li>);
    list.push(<br/>)
    list.push(<div class="line"></div>)
  }*/


  return (
<div className="Header">
  <div class="flex-container">
    <div class="back_button">
      <img src="/back-button.jpg" alt="where my button at"></img>
      <button class="btn"></button>
    </div>
    <div>
    <img src="/temp-logo.jpg" alt="logo plz" width="200" height="50"></img>
    </div>
  </div>

  <div className="SearchBar">
    <input type="text" placeholder="Search:"></input>
  </div>

  <div class="flex-container">
  <div className="Users"><button class="company">Users</button></div>
  <div className="Tags"><button class="company">Tags</button></div>
  </div>
 
 
  <div className="content"> 
    {data.map((jsonObj,i) => (
      <div class ="post">
      <img src="/content-img.jpg" alt="temp"></img>
       <p>{jsonObj.song_name} {jsonObj.singer}</p>
       <br/>
       <div class="line"></div>
      </div>
      
    ))}
    </div>

  <div className="nav_bar"> 
    <div class="flex-container">
      <nav>
        <ul class ="nav_link"> 
          <li><a href="/Home">Home</a></li>
          <li><a href="#">Search</a></li>
          <li><a href="/Make_Post">New Post</a></li>
          <li><a href="#">Notifications</a></li>
        </ul>
      </nav>
    </div>
    </div>
  

</div>
/*
<div className="searchBar"> 
this.props.history.push('/') //this will go to home page

    or

    this.props.history.goBack() //this will go to previous page
    </div>
    <div className="select_type">

    </div>
    <div className="post">

    </div>
    <div className="nav_Bar">

    </div>
    */
  );
}

export default Make_Post;