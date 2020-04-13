// import and instantiate express
const axios = require("axios");
const express = require("express"); // CommonJS import style!
const bodyParser = require("body-parser");
const app = express(); // instantiate an Express object

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let request = require("request");
// we will put some server logic here later...


app.get("/", (req, res) => {
    res.send("Hello!");
  });



// export the express app we created to make it available to other modules

//mock users data
const users = [
  {
    id: 1,
    username: "kanyelover70",
    name: "Kanye Fan",
    bio: "Welcome to the good life, the life i live!",
    followers: 200,
    following: 265
  },
  {
    id: 2,
    username: "kanyehater20",
    name: "Kanye Hater",
    bio: "If I could I'd become a cow and eat grass daily",
    followers: 2000,
    following: 154
  }
];

app.get("/loadProfile", (req,res) =>{
  res.json(user[1]);
})

app.get("/following", (req, res) => {
  res.json(following);
})

app.get("/followers", (req, res) => {
  res.json(following);
})



app.get('/login', function(req, res){
var client_id = '691936c2acfc4bad82db2fe642f023ec'; // Your client id
var client_secret = '2907a5de299c4052a6f9b3f738030a7a'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/search?q=<artist name>&type=artist',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });

    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/Make_Post'
    res.redirect(uri)
  }
});
})

// mock post database
const posts = [
  {
    id: 1,
    artist_name: "Waiyu",
    song_title: "Imagine",
    username: "username123",
    post_title: "Cool song! #nyc",
    post_comment: "Very cool, thanks for sharing",
    post_commenter: "commentMan23",
    hashtag: "nyc"
  },
  {
    id: 2,
    artist_name: "Ace Frehley",
    song_title: "New York Groove",
    username: "username745",
    post_title: "Nice #nyc",
    post_comment: "Nice, thanks",
    post_commenter: "commentMan23",
    hashtag: "nyc"
  },
  {
    id: 3,
    artist_name: "Dumb artist",
    song_title: "Dumb song",
    username: "username82",
    post_title: "Dumb song!",
    post_comment: "That was pretty dumb",
    post_commenter: "commentMan23",
    hashtag: "dumbsongs"
  }
];

//mock users followed database
const following = [
  {
    id: "ilovemusic14",
    followedUsers: [
      "user123", "musiclov3r",
    ]
  }
]

// load a main feed of only followed users' posts
app.get('/mainFeed/:userId', async (req, res) => {

  const userId = req.params.userId;

  const followedUsers = getFollowedUsers(userId);

  let response = await axios.get("https://api.mockaroo.com/api/0abb6050?count=20&key=ffab93f0");

  let followedPosts = [];
  let data = response.data;
  for (let i=0; i<data.length; i++) {
    const post = data[i];
    if (followedUsers.includes(post.username)) followedPosts.push(post);
  }
  res.json(followedPosts);
});

function getFollowedUsers(userId) {

  const database = following;

  for (let i=0; i < database.length; i++) {
    let jsonObj = database[i];

    if (jsonObj.id == userId) {
      return jsonObj.followedUsers;
    }
  }
}
const trophies = [
  {
    id: 1,
    trophy: "Harmonize",
    trophy_description: "Get your first Harmony!",
    trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
    userID: 12345
  },
  {
    id: 2,
    trophy: "Musically Informed",
    trophy_description: "Follow 10 People!",
    trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
    userID: 12345
  },
  {
    id: 3,
    trophy: "So Popular",
    trophy_description: "Get 10 followers!",
    trophy_icon: "https://i.pinimg.com/originals/5f/77/4b/5f774b20b2f212b7f9b888437a097579.jpg",
    userID: 12345
  },

]

app.get('/trophies/:userID', (req, res) => {

  const userID = req.params.userID; 

  res.json(getTrophyData(userID));
});

// load and filter a feed based on a hashtag
app.get('/hashtagFeed/:hashtag', (req, res) => {

  const hashtag = req.params.hashtag; 

  res.json(getHashtagData(hashtag));
});

function getTrophyData(userID) {

  let trophyList = [];

  console.log(userID);

  for (let i=0; i<trophies.length; i++) {
    const trophy = trophies[i];
    console.log(trophy.userID);
    if (trophy.userID != userID) {
      continue;
    }
    
    trophyList.push(trophy);
  }

  return trophyList;
}


function getHashtagData(hashtag) {

  let postsResponse = [];

  console.log(hashtag);

  for (let i=0; i<posts.length; i++) {
    const post = posts[i];
    console.log(post.hashtag);
    if (post.hashtag != hashtag) {
      continue;
    }
    
    postsResponse.push(post);
  }

  return postsResponse;
}



module.exports = app;