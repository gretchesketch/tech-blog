const postId= window.location.pathname.split('/')[2]

const editPostHandler = async (evt)=> {
    console.log('Saved Clicked')
    evt.preventDefault();
    const title = document.querySelector('#edit-post-title').value 
    const body = document.querySelector('#edit-post-textarea').value;
    await fetch(`/api/posts/edit/${postId}`,{
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            postId
        }),
        headers: { 'Content-Type' : 'application/JSON'},
    });

    window.location.replace('/dashboard');

}

const newDeletePostHandler = async (evt)=> {
    evt.preventDefault();
    await fetch(`/api/posts/${evt.target.getAttribute("data-postId")}`,{
        method: 'DELETE',
    });

    window.location.replace('/dashboard');

}


document.querySelectorAll('#delete-post-button').forEach((btn) => {
    
    btn.addEventListener('click', newDeletePostHandler)
})