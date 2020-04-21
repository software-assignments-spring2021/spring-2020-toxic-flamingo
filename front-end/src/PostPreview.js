import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

import './MainFeed.css';
import Post from './Post';

const PostPreview = (props) => {

    const [data, setData] = useState([]);
    const userID = 1;
    
    // load in posts or whatever
    useEffect( () => {
        //fetch data

        axios.get("/profileposts/"+userID)
        .then ((response) => {
            setData(response.data);
        })
        .catch( err => {
            console.log("ERROR!");
            console.error(err);

            //fake backup data
            const backupData = [
                {
                    coverart: "https://www.udiscovermusic.com/wp-content/uploads/2018/08/Kanye-West-Graduation-album-cover-web-optimised-820.jpg"
                }
            ];
            setData(backupData);
        })
        
    }, []);

    

    return(
        <div className="PreviewPost">
            {data.map((jsonObj, i) => (
                <div className='coverart'>
                    <img className='pic' src={data.coverart} height="300" width="300" />
                </div>
            ))}
        </div>
    );

}

export default PostPreview;