// DOM elements
const logoutEl = document.querySelector('#logout');

// Function to logout
logoutEl.addEventListener('click', async (event) => {
    if (event) {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
});