var timerId;
let movie_div = document.getElementById("movies");
let listc = document.getElementById("listc");
let post = document.getElementById("popural");

async function searchmovies(movie_name) {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d6f6fb69be5a35406e01700ea300d8c3&language=en-US&query=${movie_name}&page=1`)
    let data = await res.json();
    // console.log('data:', data)

    return data;
  }
  catch (e) {
    console.log('e:', e)

  }
}

function appendMovies(movies) {


  movie_div.innerHTML = null;

  movies.forEach(function (movie) {

    let div = document.createElement("div");
    div.style.background = "darkslategray";
    div.style.display = "flex";

    div.addEventListener("click", () => {

      list(movie);
      movie_div.innerHTML = null;
    })

    let div2 = document.createElement("div");
    div2.style.width = "250px";

    let img = document.createElement("img");
    img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    img.style.width = "150px";
    img.style.height = "110px";

    let p = document.createElement("p");
    p.innerText = "Name:" + movie.title;
    p.style.marginLeft = '2%';

    let p1 = document.createElement("p");
    p1.innerText = "Released-On:" + movie.release_date;
    p1.style.marginLeft = '2%';

    let p2 = document.createElement("p");
    p2.innerText = "Rating:" + movie.vote_average + "/10";
    p2.style.marginLeft = '2%';

    div2.append(p, p1, p2);
    div.append(img, div2)
    movie_div.append(div);

  });
}
async function main() {
  let name = document.getElementById("movie").value;

  let res = await searchmovies(name);
  // console.log('res:', res)

  let movies_data = res.results;
  // console.log('movies_data:', movies_data)


  appendMovies(movies_data);

  // console.log("res:", res);

}

function debounce(func, delay) {

  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setTimeout(function () {
    func();
  }, delay);
}

function list(mov) {

  listc.innerHTML = null;

  let div = document.createElement("div");
  div.setAttribute("class", "searchdiv");
  window.scroll(0, 0);


  let img = document.createElement("img");
  img.src = "https://image.tmdb.org/t/p/w500" + mov.poster_path;

  let div2 = document.createElement("div");
  div2.setAttribute("class", "textpart")

  let p = document.createElement("p");
  p.innerText = "Name:- " + mov.title;

  let p11 = document.createElement("p");
  p11.innerText = "Details:- " + mov.overview;

  let p1 = document.createElement("p");
  p1.innerText = "Released-On:- " + mov.release_date;


  let p2 = document.createElement("p");
  p2.innerText = "Rating:- " + mov.vote_average + "/10";

  div2.append(p, p11, p1, p2)
  div.append(img, div2)

  listc.append(div);

}


async function popularMovies() {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d6f6fb69be5a35406e01700ea300d8c3&language=en-US&page=1&region=IN`)
    let data = await res.json();
    console.log('data:', data)
    popMov(data.results);

  }
  catch (e) {
    console.log('e:', e)

  }
}


function popMov(pop) {

  pop.forEach(function (popp) {

    let div = document.createElement("div");
    div.setAttribute("class", "popu")
    div.addEventListener("click", () => {
      list(popp);
    })


    let img = document.createElement("img");
    img.src = "https://image.tmdb.org/t/p/w500" + popp.poster_path;

    let div2 = document.createElement("div");
    div2.setAttribute("class", "textt");


    let p = document.createElement("p");
    p.innerText = popp.original_title;

    let p1 = document.createElement("p");
    p1.innerText = popp.release_date;

    let p2 = document.createElement("p");
    p2.innerText = "Rating:- " + popp.vote_average + "/10";

    div2.append(p, p1, p2);
    div.append(img, div2);
    post.append(div)
  });
}

popularMovies();

let Register = document.getElementById("sign");
Register.addEventListener("click", () => {
  document.getElementById("pop").style.display = 'flex';

});

let closepop = document.getElementById("close");
closepop.addEventListener("click", () => {
  document.getElementById("pop").style.display = 'none';
});

let login = document.getElementById("login");
   login.addEventListener("click",()=>{
   document.getElementById("signup").style.display = "none";
   document.getElementById("signin").style.display = "block";
 });

 let backtosign = document.getElementById("backtosign");
 backtosign.addEventListener("click",()=>{
   document.getElementById("signup").style.display = "block";
   document.getElementById("signin").style.display = "none";
 });





function Signup(e){
e.preventDefault()

let form = document.getElementById("signup-form");

let user_data = {
  name:form.name.value,
  email:form.email.value,
  password:form.password.value,
  username:form.username.value,
  mobile:form.mobile.value,
  description:form.description.value,
};

user_data = JSON.stringify(user_data)

fetch("https://masai-api-mocker.herokuapp.com/auth/register", {

  method:"POST",

  body: user_data,

  headers: {
      "Content-type": "application/json",

  },
})
.then((res) => {
  return res.json();
})
.then((res) =>{
 let userexist = document.getElementById("userpop");
  if(res.error === false){
    userexist.innerText = "Sign Up Successfully";
    userexist.style.color = "green";
    form.innerHTML = null;
    document.getElementById("signin").style.display = "block";
    document.getElementById("signup").style.display = "none";
    //  alert("Sign Up Successfully");
  }
  else{
    userexist.innerText = "User Already Exist";
    userexist.style.color = "red";
    // alert("User Already Exist")
  }
  console.log('res:', res);

})
.catch((err) =>{
console.log('err:', err);

});

}

function logins(ev){
ev.preventDefault()


let form = document.getElementById("signin-form");

let user_data = {
  username:form.user.value,
  password:form.pass.value,
  
};

let data_to_send = JSON.stringify(user_data);
console.log('data_to_send:', data_to_send)

fetch("https://masai-api-mocker.herokuapp.com/auth/login", {

  method:"POST",

  body: data_to_send,
  
  headers: {
      "Content-type": "application/json",
  },
})
.then((res) =>{
  return res.json();
})
.then((res) =>{
let userexist2 = document.getElementById("userpop2");
   if(res.error === false){
      userexist2.innerText = "Sign In Successfully";
      document.getElementById("pop").style.display = 'none';
   }
   else{
    userexist2.innerText = "Wrong Username Or Password";
    userexist2.style.color = "red";
    
   }
  console.log('res:', res);
  fetchmyData(user_data.username, res.token)
  if(res.error == false){
  Register.innerHTML = user_data.username;
  }

})
.catch((err) =>{
console.log('err:', err);
});
}

function fetchmyData(username, token) {
fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {
  headers: {
      "Content-Type" : "application/json",
      Authorization: `Bearer ${token}`,
  },
})
.then((res) =>{
  return res.json();
})
.then((res) =>{
  console.log('res:', res);
  // localStorage.setItem("username",res.)
})
.catch((err) =>{
console.log('err:', err);

});

}

let refresh = document.getElementById("signout");
refresh.addEventListener("click", ()=>{
  location.reload();
});