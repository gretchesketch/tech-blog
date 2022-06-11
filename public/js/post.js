const newPostHandler = async (evt)=> {
  evt.preventDefault();
  const title = document.querySelector('#create-post-title').value 
  const content = document.querySelector('#create-post-content').value;
  
  await fetch('/api/posts',{
      method: 'POST',
      body: JSON.stringify({
          title,
          content,
      }),
      headers: { 'Content-Type' : 'application/JSON'},
  });

  window.location.replace('/dashboard');

}

const cancelHandler = async (evt)=> {
  evt.preventDefault();
  window.location.replace('/dashboard');
}
document.querySelector('#create-post-form').addEventListener('submit', newPostHandler);
//document.querySelector('#cancel').addEventListener('click', cancelHandler);