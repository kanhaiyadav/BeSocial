

let deletePost = (post_link_dom) => {
    $(post_link_dom).click((event) => {
        console.log('i got clicked');
        event.preventDefault();
        $.ajax({
            type: "get",
            url: $(post_link_dom).prop("href"),
            success: (data) => {
                console.log('ok');
                $(`#post-${data.data.post_id}`).remove();
            },
            error: (error) => {
                console.log("why???");
                console.log(error.responseText);
            },
        })
    })
}

let createPost = () => {
    let newPostForm = $("#new-post-form");
    newPostForm.submit((event) => {
        event.preventDefault();
        $.ajax({
            type: "post",
            url: "/post/create",
            data: newPostForm.serialize(),//gives data in the form of a json
            success: (data) => {
                let newPost = newPostDom(data.data.post);
                $("#posts-container").prepend(newPost);
                deletePost($(' .delete-link', newPost));
            },
            error: (error) => {
                console.log(error.responseText);
            },
        })
    })
}


//method to add post into the dom
let newPostDom = (post) => {
    return $(`<div id="post-${post._id}">
      <div>
        ${post.content}<br />author:${post.user.name} 
        <a class="delete-link" href="/post/destroy/${post._id}">Delete</a>
      </div>
      <form action="/comment/create" method="post">
        <textarea name="content" cols="50" rows="2"></textarea>
        <input type="hidden" value="${post._id} " name="post_id" />
        <button type="submit">Post Comment</button>
      </form>
      <br />
      <div id="comments-container">
                   
        </div>
    </div>`)
}


createPost();