/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/vincesanders')
  .then(res => {
    const newCard = githubUserCardCreator(res);
    const cardContainer = document.querySelector('.cards');
    cardContainer.appendChild(newCard);
    return res;
  }).then(res => {
    axios.get(res.data.followers_url).then(newRes => {   //getfollowers_url data
      newRes.data.forEach(followerObj => {               //github returns an array of objects, each is a follower
        getGHUser(followerObj.login);                    //create a card for each
      });
    }).catch(err => {
      console.log(err);
    });
  }).catch(err => {
    console.log(err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tadepew',
  'aalvinlin',
  'SpencerElggren',
  'kjmagill',
  'skooger',
  'heyclos'
];

followersArray.forEach(f => {
  getGHUser(f);
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function githubUserCardCreator(res) {

  //create elements
  const card = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const page = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  //add classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  //add content
  userImg.src = res.data.avatar_url;
  name.textContent = res.data.name;
  username.textContent = res.data.login;
  location.textContent = 'Location: ' + res.data.location;
  profile.textContent = 'Profile: '
  page.href = res.data.html_url;
  page.textContent = res.data.html_url;
  followers.textContent = 'Followers: ' + res.data.followers;
  following.textContent = 'Following: ' + res.data.following;
  bio.textContent = 'Bio: ' + res.data.bio;

  //append to parent
  profile.appendChild(page);
  cardInfo.append(name, username, location, profile, followers, following, bio);
  card.append(userImg, cardInfo);

  return card;
}

function getGHUser(username) {
  axios.get('https://api.github.com/users/' + username)
  .then(res => {
    const newCard = githubUserCardCreator(res);
    const cardContainer = document.querySelector('.cards');
    cardContainer.appendChild(newCard);
  }).catch(err => {
    console.log(err);
  });
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/