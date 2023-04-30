{
    //method to submit the post using AJAX
let createPost = function(){
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/posts/create",
            data: newPostForm.serialize(),
            success: function(data){
             let newPost = newPostDom(data.data.post);
             $("#posts-lists-container>ul").prepend(newPost);
             deletePost($(".delete-post-button",newPost));

           // call the create comment class
           new PostComments(data.data.post._id);

           new Noty({
               theme: 'relax',
               text: "Post published!",
               type: 'success',
               layout: 'topRight',
               timeout: 1500
               
           }).show();

            },error: function(error){
               console.log(error);
            }
        });
    });
}
         //method to create a post using DOM
         let newPostDom = function(post){
           return $(`<li id="post-${post._id}">
           <p>
              
               <small>
                      <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
               </small>
             
               ${ post.content}
                      <br>
                      <small>
                             ${ post.user.name }
                      </small>
           </p>
           <div class="post-comments">
              
                 <form id="post-${ post._id }-comments-form" action="/comments/create" method="post">
           
                      <input type="text" name="content" placeholder="Type here to add comment..." required>
                      <input type="hidden" name="post" value="${post._id}">
                      <input type="submit" value="Add comment">
                 </form>
                     
           </div>
           <div class="post-comments-list">
               <ul id = "post-comments-${post._id}">
                     
               </ul>
           </div>
           </li>
           `)
         }



         //method to delete a post from dom
         let deletePost = function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();

                $.ajax({
                    type: "get",
                    url: $(deleteLink).prop("href"),
                    success: function(data){
                         $(`#post-${data.data.post_id}`).remove();
                         new Noty({
                            theme: 'relax',
                            text: "Post Deleted",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },error: function(error){
                        console.log(error);
                    }
                });
            })
         }
    createPost();

}