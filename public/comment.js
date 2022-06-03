// DOM Selection
const addCommentBtnEl = document.querySelector('#create-comment');

// Event listener function
addCommentBtnEl.addEventListener('click', async (event) => {
    console.log(addCommentBtnEl);
    event.preventDefault();
    const comment = document.querySelector('textarea[name="post_comment"]').value.trim();
    const post_id = addCommentBtnEl.getAttribute('name');
    console.log(comment, post_id);
    try {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    catch (e) {
        console.log(e);
    };

    document.location.reload();
});