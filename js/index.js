//Gets the user input and assigns it to the variable user input

document.getElementById('github-form').addEventListener('submit', function(event){
    event.preventDefault()
    
    const userInput = document.getElementById('search').value

    getDatafromGit(userInput)
})

//This function fetches the name of the user from Github
//It also calls the function updateHtml

function getDatafromGit(username){
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response => response.json())
    .then(data => {
        updateHtml(data)})
        .catch(error=> {
            console.log(error)
        })
}

//This function assigns the user from github to a list
//Calls the function display user

function updateHtml(data){
    const userList = document.getElementById('user-list')
    const userlist2 = data.items
    userlist2.forEach(element => {
    const listName = document.createElement('li')
    listName.innerHTML = `${element.login}`
    listName.addEventListener('click', function(){
        displayUser(element)
    })
    userList.appendChild(listName)
    });
    
 }
 
//This function gets the users avatar and repos from github

 function displayUser(user){
    const detailList = document.getElementById("repos-list")
    detailList.innerHTML = `
    <img src="${user.image_url}>
    <ul>"${user.login}"</ul>`

    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(response => response.json())
    .then(repos => {
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.textContent = repo.name;
            detailList.appendChild(repoItem);
        });
    })
    .catch(error => {
        console.log(error);
    });
 }
