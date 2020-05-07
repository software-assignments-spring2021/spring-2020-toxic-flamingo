import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import BurgerMenu from './BurgerMenu';
import './PersonalProfile.css';

import './PostPreview';
import PostPreview from './PostPreview';
import ProfPicPopUp from './ProfPicPopUp';
import BioPopUp from './BioPopUp';

// import logo from './logo.svg';
//import './About.css';

const PersonalProfile = (props) => {
  const [profSeen, setProfSeen] = useState(false);
  const [bioSeen, setBioSeen] = useState(false);

  const [data, setData] = useState({});
  //const [showScreenOne, setScreenOne] = useState(false);
  const [followingNum, setFollowingNum] = useState();
  const [followerNum, setFollowerNum] = useState();

  let userID = 1;
  console.log(props);
  // load in posts or whatever
  useEffect( () => {
    //fetch data
    axios.get("/user/" + "true/" + userID )
    .then ((response) => {
      console.log("data: " + response.data.username);
      setData(response.data);
      try {
        setFollowingNum(response.data.following.length);
      } catch {
        setFollowingNum(0);  
      }
      try {
        setFollowerNum(response.data.follower.length);
      } catch {
        setFollowerNum(0);
      }
    })
    .catch( err => {
        console.log("ERROR!");
        console.error(err);

        //fake backup data
        const backupData = [
            {
                id: 1,
                username: "kanyelover70",
                pic: "https://www.dictionary.com/e/wp-content/uploads/2018/04/kawaii.jpg",
                name: "Kanye Fan",
                bio: "Welcome to the good life, the life i live!",
                followers: 200,
                following: 265
            }
        ];
        setData(backupData);



    })

    
}, []);

function ProfPicPopOpen() {
  setProfSeen(true);
};

function ProfPicPopClose() {
  setProfSeen(false);
};

function BioPopOpen() {
  setBioSeen(true);
};

function BioPopClose() {
  setBioSeen(false);
};
  
console.log(data.id);
if (!data.id) {
  return (
    <h1>Loading...</h1>
  )
} else {
    return (
          <div className='Profile'>
            <BurgerMenu right pageWrapID={"ProfileHeader"} outerContainerID={"outer-container"}/>
            <div className="ProfileHeader">

                <div className="flex-container">

                <img className="PictureInProfile" alt="Profile Picture Here" src={data.pic}  width="100" height="100"/>
                  <button className="profileButton" onClick={ProfPicPopOpen}>Edit Profile Picture</button>
                {profSeen ? <ProfPicPopUp toggle={ProfPicPopClose} /> : null}
                  <div className="UserNameAndBio"> <h1>{data.username}</h1> <div className="bio"><p>{data.bio}</p> </div></div>
                  <button className="bioButton" onClick={BioPopOpen}>Edit Bio</button>
                {bioSeen ? <BioPopUp toggle={BioPopClose} /> : null}
                </div>
            </div>
            <div className='buttons'>
              <div className="flex-container">
                  <form action="/Followee">
                  <button id="following">Following {followingNum}</button>
                  </form>
                  <form action="/Follower">
                  <button id="followers">Followers {followerNum}</button>
                  </form>
                  <form action="/Harmonies">
                  <button id="harmonies" >Harmonies</button>
                  </form>
              </div>     
            </div>

                      
            
        <div className="contain">
      <PostPreview userID = {data.id}/>
        </div>
      </div> 
    );
  }
}

export default PersonalProfile;