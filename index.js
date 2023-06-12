"use strict"

async function getUser(name){
    const res = await fetch("https://api.github.com/users/solomonyaw");
     const profile = await res.json();
     return profile;

}

console.log(getUser());




