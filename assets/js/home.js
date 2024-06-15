const postForm = document.getElementById("new-post-form");
const postContainer = document.getElementById('posts-container');
const deleteLinks = document.querySelectorAll(".delete-link");
const commentForms = document.querySelectorAll('.comment-form');
const commentDeleteLinks = document.querySelectorAll('.comment-delete-link');
const comment_btn = document.querySelectorAll(".comment-btn");

let commentBoxToggle = (event) => {
    event.preventDefault();
    let commentBox = event.target.nextElementSibling;
    if (commentBox.style.display === "block") {
        commentBox.style.display = "none";
    } else {
        commentBox.style.display = "block";
    }
    commentBox.parentElement.scrollBy({
        top: 300,
        behavior: 'smooth'
    })
}

let deletePost = async function (event) {
    event.preventDefault();
    url = event.target.parentElement.href;
    console.log(event.target);
    let responce = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (responce.ok) {
        responce = await responce.json();
        console.log(responce);
        document.getElementById(`post-${responce.data.post_id}`).remove();
    }
}

let deleteComment = async (event) => {
    event.preventDefault();
    let url = event.target.parentElement.href;
    let responce = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (responce.ok) {
        responce = await responce.json();
        console.log(responce);
        document.getElementById(`comment-${responce.data.comment_id}`).remove();
    }
}


let createComment = async (event) => {
    event.preventDefault();
    let url = "/comment/create";
    let responce = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target))),
    });
    if (responce.ok) {
        responce = await responce.json();
        let comment = responce.data.comment;
        console.log(responce);
        console.log(comment);
        let newComment = `
        <div id="comment-${comment._id}" class="comment">
            <div>
                <i class="fa-solid fa-user"></i><span>@${comment.user.name}</span>
                <a class="comment-delete-link" href="/comment/destroy/${comment._id}"><i class="fa-solid fa-trash-can"></i></a>
            </div>
            <p>${comment.content}</p>
          </div>
        `
        document.getElementById(`comments-container-${comment.post}`).innerHTML += newComment;

    }
    links = document.querySelectorAll(".comment-delete-link");
    event.target.reset();
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", deleteComment);
    }
}
for (let i = 0; i < commentDeleteLinks.length; i++) {
    commentDeleteLinks[i].addEventListener("click", deleteComment);
}

for (let i = 0; i < commentForms.length; i++) {
    commentForms[i].addEventListener("submit", createComment);
}

for (let i = 0; i < deleteLinks.length; i++) {
    deleteLinks[i].addEventListener("click", deletePost);
}

for (let i = 0; i < comment_btn.length; i++) {
    comment_btn[i].addEventListener("click", commentBoxToggle);
}

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

        <div class="post-user"><i class="fa-solid fa-user"></i><span>@${responce.data.userName}</span></div>

        <p class="post-text">
          ${responce.data.post.content}
        </p>

        <a class="delete-link" href="/post/destroy/${responce.data.post._id}"><i class="fa-solid fa-trash-can"></i></a>

        <button class="comment-btn" type="button"><i class="fa-solid fa-message"></i>Comments<i class="fa-solid fa-caret-down"></i></button>

        <div id="comments-container-${responce.data.post._id}" class="comment-container">

        </div>

      </div>

      <form class="comment-form" action="/comment/create" method="post">
        <textarea name="content" cols="45" rows="1" placeholder="Add a comment ..."></textarea>
        <input type="hidden" value=${responce.data.post._id} name="post_id" />
        <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
      </form>

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
    }
    else {
        console.error("error in creating post");
        console.log(responce);
    }
});

