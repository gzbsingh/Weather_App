document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("https://weatherapp-production-db8f.up.railway.app/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Authentication successful, handle further actions (e.g., redirect to another page)
            console.log('Authentication successful');
            const res= await response.json();

            console.log(res);
            const token=res.jwtToken;
            localStorage.setItem("token",token);
            window.location.href = 'index.html'; // Redirect to dashboard page
        } else {
            // Authentication failed
            const errorMessage = await response.message;
            console.error('Authentication failed:', response);
            alert('Authentication failed. Please try valid username or password again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
});