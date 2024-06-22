
const navTitles = document.querySelectorAll('nav>p');
const posts = document.getElementById('posts');
const liked = document.getElementById('liked');
const disliked = document.getElementById('disliked');
const saved = document.getElementById('saved');
const postsContainer = document.getElementById('posts-container');
const likedContainer = document.getElementById('liked-posts-container');
const dislikedContainer = document.getElementById('disliked-posts-container');
const savedContainer = document.getElementById('saved-posts-container');
let prevTitle;
let preContainer;
document.addEventListener('DOMContentLoaded', () => {
    navTitles[0].style.backgroundColor = 'rgb(236, 236, 248)';
    prevTitle = navTitles[0];
    preContainer = postsContainer;
})


liked.addEventListener('click', async (event) => {
    event.target.style.backgroundColor = 'rgb(236, 236, 248)';
    preContainer.innerHTML = '';
    preContainer = likedContainer;
    if (prevTitle != event.target) {
        prevTitle.style.backgroundColor = 'white';
        prevTitle = event.target;
    }
    else {
        return;
    }
    let url = '/user/liked';
    let responce = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (responce.ok) {
        responce = await responce.json();
        console.log(responce);
    }
});