const overview = document.querySelector(".overview");
const username = "andicuevasp";
const repoListElement = document.querySelector(".repo-list");
const repoInfoElement = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepoButton = document.querySelector("button");
const filterInput = document.querySelector("input");


const gitUserInfo = async function(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();

  
    showUserInfo(data);
};

gitUserInfo();

const showUserInfo = function(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<figure>
   <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;

  overview.append(userInfo);
  gitRepoList();

};

const gitRepoList = async function(){
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();

  showRepos(repoData);
};

const showRepos = function(repos){
  filterInput.classList.remove("hide");
  for(const repo of repos){
  const repoItem = document.createElement("li");
  repoItem.classList.add("repo");
  repoItem.innerHTML = `<h3>${repo.name}</h3>`;

  repoListElement.append(repoItem);

  }
};

repoListElement.addEventListener("click",function(e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }

});


const getRepoInfo = async function(repoName){
  const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchRepoInfo.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
 

  const languages = [];

  for( const language in languageData){
    languages.push(language);
    
  }

  showRepoInfo(repoInfo,languages);
  
};

const showRepoInfo = function(repoInfo,languages){
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoInfoElement.classList.add("hide");
  backToRepoButton.classList.remove("hide");
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
 
  repoData.append(div);

};

backToRepoButton.addEventListener("click", function(e){
  repoInfoElement.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepoButton.classList.add("hide");
});

filterInput.addEventListener("input",function(e){
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for(const repo of repos){
    const repoLowerText= repo.innerText.toLowerCase();
    if(repoLowerText.includes(searchLowerText)){
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }


});
