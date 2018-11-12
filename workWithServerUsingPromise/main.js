var tPages;
function isCleanElem()
{
    $('.card-deck').html("");
}
function showUsers(arrUsers)
    {
        isCleanElem();
        arrUsers.forEach(user => 
        {
            render(user);
        });      
    };

function getUsers(url, type, page)
{
    return new Promise(function (resolve, reject)
    {
        $.ajax
            ({
                url: url + page,
                type: type,
                success: function (responce)
                {
                    return resolve(responce.data);
                }
            })
    });
}

function getTotalPages(url, type) {
    return new Promise(function (resolve, reject)
    {
        $.ajax
            ({
                url: url,
                type: type,
                success: function (resultResponce)
                {
                    return resolve(resultResponce.total_pages);
                },
                error: function () {
                    return resolve(4);
                }
            })
    });
}

function sendPostRequest(url, userForSend)
{
    return new Promise(function (resolve, reject)
    {
        $.ajax
            ({
                url: url,
                type: "POST",
                data:
                {
                    "name": userForSend.name,
                    "password": userForSend.password
                },
                success: function (responseText)
                {
                    return resolve(responseText);
                },
                error: function (textStatus) {
                    return resolve(textStatus);
                }
            })
    });
}

function render(user)
{
    let card = $("<div class='card'>" + "</div>");
    let name =$("<h5 class='card-title'>" + user.first_name + " " + user.last_name + "</h5>");
    let card_body = $("<div class='card-body'>" + "</div>");
    let img = $("<img class='card-img-top' src = " + user.avatar + " alt='avatar'>");
 
    $(card).append(img);
    $(card_body).append(name);
    $(card).append(card_body);

    $('.card-deck').append(card);
};

$(function()
{   
    getTotalPages("https://reqres.in/api/users", "Get")
        .then(function (totalPages) { tPages = totalPages; })
        .catch(function (totalPages) { tPages = totalPages; });
                 
    
    $("#form").submit(function () {
        let user = {};
        user.name = $("#name").val();
        user.password = $("#password").val();
        sendPostRequest("https://reqres.in/api/users", user)
            .then(function (res) { $('#reqText').text("The user has added!!!" + res) })
            .catch(function (status) { $('#reqText').text("The user hasn't added!!! Request status: " + status) })
    });

    $('#pagination').twbsPagination(
        {
            totalPages: tPages = (tPages) ? tPages : 4,
            visiblePages: 3,
            next: 'Next',
            prev: 'Prev',
            onPageClick: function (event, page)
            {
                getUsers("https://reqres.in/api/users?page=", "Get", page).then(function (users)
                {
                   showUsers(users);
                })
            }
        });  
});


