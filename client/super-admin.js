let user;
let admin;
$(document).ready(function () {
    let token = localStorage.getItem('jwt');
    let id = localStorage.getItem('userID');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/users',
        contentType: 'application/json',
        headers: { "Authorization": token }
    }).done(data => {
        user = data;
        for (var i = 0; i < data.result.length; i += 1) {
            $("#data-table-body").append('<tr>' + '<td>' + (i + 1) + '</td>' + '<td>' + data.result[i].name + '</td>' + '<td>'
                + data.result[i].category + '</td>' + '<td>' + data.result[i].role + '</td>' + '<td>' + '<button class="btn btn-outline-dark btn-sm" onclick="getEmployee(' + i + ')"> details </button>' + '</td>' + '<td>' + '<button class="btn btn-outline-danger btn-sm" onclick="removeEmployee(' + i + ')"> delete </button>' + '</td>' + '</tr>');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/user/' + id,
        contentType: 'application/json',
        headers: { "Authorization": localStorage.getItem('jwt') },
        success: function (result) {
            admin = result.user;
            localStorage.setItem('userName', result.user.name);
            $('#nav-name').html(result.user.name);
            $('#name').html(result.user.name);
            $('#category').html(result.user.category);
            $('#email').html(result.user.email);
            $('#phone').html(result.user.contact);
            $('#project').html(result.projectName);
            // swal('Successfully added...').then(() => {
            //     location.reload();
            // });
        },
        error: function (jqXHR, textStatus, err) {
            swal('Error...');
        }
    });

});


function showOldProfile() {
    $('#ename').val(admin.name);
    $('#eemail').val(admin.email);
    $('#econtact').val(admin.contact);
}

function updateProfile() {
    const name = $('#ename').val();
    const email = $('#eemail').val();
    const contact = $('#econtact').val();
    const password = $('#epassword').val();
    const updatedProfile = {
        name,
        email,
        contact
    };

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/user/',
        contentType: 'application/json',
        headers: { "Authorization": localStorage.getItem('jwt') },
        data: JSON.stringify(updatedProfile),
        success: function (data) {
            swal('Successfully updated...').then(() => {
                location.reload();
            });
        },
        error: function (jqXHR, textStatus, err) {
            swal('Unsuccessfull updated profile...');
        }
    });
}

function getEmployee(index) {
    let id = user.result[index]._id;
    localStorage.setItem('userID', id);
    window.location.href = 'profile.html';
}

function removeEmployee(index) {
    let id = user.result[index]._id;
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/user/' + id,
        contentType: 'application/json',
        headers: { "Authorization": localStorage.getItem('jwt') },
        success: function (data) {
            swal('Successfully deleted...').then(() => {
                location.reload();
            });
        },
        error: function (jqXHR, textStatus, err) {
            swal('Email is already registered...');
        }
    });
}

function register() {
    const name = $('#empname').val();
    console.log(name);
    const email = $('#empemail').val();
    const contact = $('#empcontact').val();
    const password = $('#emppassword').val();
    const category = $('#category-select').find('option:selected').val()
    const role = $('#myselect').find('option:selected').val()
    console.log(name + ' ' + email + ' ' + contact + ' ' + password + ' ' + role);
    if (name == '' || email == '' || contact == '' || password == '' || role == '') {
        return swal('All field required...');
    }

    // const user = {
    //     'name' : name,
    //     'email' : email,
    //     'contact' : contact,
    //     'password' : password,
    //     'role' : role
    // };
    const user = {
        name,
        email,
        contact,
        password,
        role,
        category
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/register/' + role,
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function (data) {
            swal('Successfully added...').then(() => {
                location.reload();
            });
        },
        error: function (jqXHR, textStatus, err) {
            swal('Email is already registered...').then(() => {
                location.reload();
            });
        }
    });
}

function addProject() {
    const name = $('#project-name').val();
    const category = $('#project-select').find('option:selected').val();
    console.log(name + ' ' + category);

    const project = {
        name,
        category
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/project',
        contentType: 'application/json',
        headers: { "Authorization": localStorage.getItem('jwt') },
        data: JSON.stringify(project),
        success: function (data) {
            swal('Successfully added...').then(() => {
                location.reload();
            });
        },
        error: function (jqXHR, textStatus, err) {
            swal('Project is already Present...');
        }
    });
}