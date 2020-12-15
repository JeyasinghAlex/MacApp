function login() {
    const email = $("#email").val();
    const password = $("#password").val();

    if (email == '' || password == '') {
        return alert('email or password missing!    ')
    }

    let loginCredentials = {
        email,
        password
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/login',
        contentType: "application/x-www-form-urlencoded",
        data: loginCredentials
    }).done(data => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem('userID', data.id);
        
        if (data.role === 'super-admin') {
            window.location.href = "super-admin.html";
        } else if (data.role === 'admin') {

        } else if (data.role === 'user') {
            window.location.href = "profile.html";
        } else {
            alert('Invalid login credentials');
        }
    });
}
