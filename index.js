"use strict"
const CLIENT_ID = `c8bf846708edbd3a5559`;
const CLIENT_SECRET = `403a193496deae56f0914998905516be7af28ee7`

async function getUser(name){
    const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
     const profile = await res.json();
     return profile;

}

async function getRepo(profile){
    const res = await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=10`);
    const repo = await res.json();
    return repo;
}

document.getElementById("search").addEventListener("submit",async function(event){
   event.preventDefault();

   const username = document.querySelector("#findByUsername").value;
   const profile = await getUser(username);
   const repo = await getRepo(profile);
   
    
   showProfile(profile);
   showRepos(repo);
      

});

function showProfile(profile){

    document.querySelector(".profile").innerHTML =`<img src="${profile.avatar_url}"
    alt="letstrie"
  />
  <p class="name">${profile.name}</p>
  <p class="username login">${profile.login}</p>
  <p class="bio">
  ${profile.bio}
  </p>

  <div class="followers-stars">
    <p>
      <ion-icon name="people-outline"></ion-icon>
      <span class="followers">  ${profile.followers}</span> followers
    </p>
    <span class="dot">·</span>
    <p><span class="following"> ${profile.following}</span> following</p>
  </div>

  <p class="company">
    <ion-icon name="business-outline"></ion-icon>
    ${profile.company}
  </p>
  <p class="location">
    <ion-icon name="location-outline"></ion-icon> ${profile.location}
  </p>
`;
    
}

function showRepos(repo){
  
    
    let newHtml =``;
    for(let repos of repo)
    {
       newHtml+=` <div class="repo">
       <div class="repo_name">
         <a href="${repos.html_url}">${repos.name}</a>
       </div>
       <p>
         <span class="circle"></span> ${repos.language}
         <ion-icon name="star-outline"></ion-icon> ${repos.watchers_count}
         <ion-icon name="git-branch-outline"></ion-icon> ${repos.forks_count}
       </p>
     </div>`
    }
    document.querySelector(".repos").insertAdjacentHTML("afterbegin",newHtml);
}
   
/**             */
 

