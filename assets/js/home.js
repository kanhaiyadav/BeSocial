const postForm = document.getElementById("new-post-form");
const postContainer = document.getElementById('posts-container');

postForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    url = "/post/create";
    let responce = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(postForm))),
    });
    if (responce.ok) {
        responce = await responce.json();
        console.log(responce);
        postContainer.innerHTML = postContainer.innerHTML +
            `
            <div id="post-${responce.data.post._id}" class="post">

      <div>
      
<div class="post-user">
            
            <a href="/profile/${responce.data.postUser._id}" target="_blank">
                <div class="user-avatar">
                    <img src="${responce.data.postUser.avatar}" alt="">
                </div>
                <span>
                        YOU
                </span>
            </a>
            <div>
                <div>
                    <i class="fa-solid fa-thumbs-up" style="color: #c7c7c7;font-style: italic;"></i>
                    <span>${responce.data.post.likesCount}</span>
                </div>
                <div>
                    <i class="fa-solid fa-thumbs-down" style="color: #c7c7c7;font-style: italic;"></i>
                    <span>
                        ${responce.data.post.dislikesCount}
                    </span>
                </div>
            </div>
        </div>      


        <p class="post-text">
          ${responce.data.post.content}
        </p>

        <a class="delete-link" href="/post/destroy/${responce.data.post._id}"><i class="fa-solid fa-trash-can"></i></a>

        <button class="comment-btn" type="button"><i class="fa-solid fa-message"></i>Comments<i class="fa-solid fa-caret-down"></i></button>

        <div id="comments-container-${responce.data.post._id}" class="comment-container">

        </div>

      </div>

    </div>
            `
        postForm.reset();
        // document.querySelector(`#post-${responce.data.post._id} .delete-link`).addEventListener("click", deletePost);
        const pDeleteLinks = document.querySelectorAll(".delete-link");
        for (let i = 0; i < pDeleteLinks.length; i++) {
            pDeleteLinks[i].addEventListener("click", deletePost);
        }
        // document.querySelector(`#post-${responce.data.post._id} form`).addEventListener("submit", createComment);
        const cForms = document.querySelectorAll('.comment-form');
        for (let i = 0; i < cForms.length; i++) {
            cForms[i].addEventListener("submit", createComment);
        }
        let cmnt_btn = document.querySelectorAll(".comment-btn");
        for (let i = 0; i < cmnt_btn.length; i++) {
            cmnt_btn[i].addEventListener("click", commentBoxToggle);
        }

        const l_link = document.querySelectorAll(".fa-thumbs-up");
        for (let i = 0; i < l_link.length; i++) {
            l_link[i].parentElement.addEventListener("click", like);
        }

        const dl_link = document.querySelectorAll(".fa-thumbs-down");
        for (let i = 0; i < dl_link.length; i++) {
            dl_link[i].parentElement.addEventListener("click", dislike);
        }
    }
    else {
        console.error("error in creating post");
        console.log(responce);
    }
});

