const overview = document.querySelector(".overview");
const username = "andicuevasp";
const repoListElement = document.querySelector(".repo-list");

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
  for(const repo of repos){
  const repoItem = document.createElement("li");
  repoItem.classList.add("repo");
  repoItem.innerHTML = `<h3>${repo.name}</h3>`;

  repoListElement.append(repoItem);

  }
};
