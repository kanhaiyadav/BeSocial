
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
// document.addEventListener('DOMContentLoaded', () => {
//     navTitles[0].style.backgroundColor = 'rgb(236, 236, 248)';
// })

posts.addEventListener('click', async (event) => {
    preContainer = postsContainer;
    event.target.style.backgroundColor = 'rgb(236, 236, 248)';
    if (prevTitle != event.target) {
        if (!(prevTitle == undefined)) {
            prevTitle.style.backgroundColor = 'white';
        }
        prevTitle = event.target;
    }
    else {
        return;
    }
    let url = '/user/posts';
    let responce = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (responce.ok) {
        responce = await responce.json();
        console.log(responce);
        for (let post of responce.data.posts) {
            let comments = ``;
            for (let comment of post.comments) {
                comments += `
                    <div id="comment-${comment._id}" class="comment">
                        <div>
                            <i class="fa-solid fa-user"></i><span>@${comment.user.name}</span>
                            <a class="comment-delete-link" href="/comment/destroy/${comment._id}">
                                <i class="fa-solid fa-trash-can"></i>
                            </a>
                        </div>
                        <p>
                            ${comment.content}
                        </p>
                    </div>
                    `
            }
            postsContainer.innerHTML +=
                `
          <div id="post-${post._id}" class="post">
          <div>
      
            <div class="post-user">

                <a href="/profile/${post.user._id}" target="_blank">
                    <div class="user-avatar">
                        <img src="${post.user.avatar}" alt="">
                    </div>
                    <span>
                            YOU
                    </span>
                </a>

                <div>
                    <div>
                        <i class="fa-solid fa-thumbs-up" style="color: #c7c7c7;font-style: italic;"></i>
                        <span>${post.likesCount}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-thumbs-down" style="color: #c7c7c7;font-style: italic;"></i>
                        <span>
                            ${post.dislikesCount}
                        </span>
                    </div>
                </div>
            </div>      


            <p class="post-text">
              ${post.content}
            </p>

            <a class="delete-link" href="/post/destroy/${post._id}"><i class="fa-solid fa-trash-can"></i></a>

            <button class="comment-btn" type="button"><i class="fa-solid fa-message"></i>Comments<i class="fa-solid fa-caret-down"></i></button>

            <div id="comments-container-${post._id}" class="comment-container">` + comments +

                `</div>

          </div>

          </div>
                `
        }
    }
});

navTitles[0].click();

liked.addEventListener('click', async (event) => {
    preContainer.innerHTML = '';
    preContainer = likedContainer;
    event.target.style.backgroundColor = 'rgb(236, 236, 248)';
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