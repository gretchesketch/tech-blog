// DOM Selection
const deletePostBtnEl = document.querySelector('#delete-post');
const editPostBtnEl = document.querySelector('#edit-post');
const submitPostBtnEl = document.querySelector('#submit-edit-post');

// Event listener for delete post button
if (deletePostBtnEl) {
    const post_id = deletePostBtnEl.name || 'novalue';
    deletePostBtnEl.addEventListener('click', async (event) => {
        event.preventDefault();

        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    });
}


// Event listener for edit post button
if (editPostBtnEl) {
    const post_id = editPostBtnEl.name || 'novalue';
    editPostBtnEl.addEventListener('click', async (event) => {
        event.preventDefault();
        document.location.replace(`dashboard/edit/${post_id}`);
    });
}

//  Event listener for submitting edited post

if (submitPostBtnEl) {

    submitPostBtnEl.addEventListener('click', async (event) => {
        event.preventDefault();
        const post_title = document.querySelector('textarea[name="post_title"]').value.trim();
        const post_contents = document.querySelector('textarea[name="post_content"]').value.trim();
        const post_id = submitPostBtnEl.name || 'novalue';
        try {

            const response = await fetch(`/api/posts/${post_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    post_title,
                    post_contents
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (e) {
            console.log(e);
        };
        document.location.replace('/dashboard');
    });
}