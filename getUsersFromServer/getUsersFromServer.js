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

function openAndSendGetRequest(url, page)
{
    var request = new XMLHttpRequest();
    request.open("Get", url + page);
    request.onreadystatechange = function()
    {
        if(request.readyState == XMLHttpRequest.DONE)
        {
            //pages = JSON.parse(request.responseText).total_pages;
            showUsers(JSON.parse(request.responseText).data);                 
        }
    }
    request.send();
}

function openAndSendPostRequest(url, userForSend) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    req.onreadystatechange = function () {
        if (req.readyState != 4)
        {
            //$('#reqText').text(req.statusText);
        }
        if (req.readyState == XMLHttpRequest.DONE) {
            
            //$('#reqText').text(req.statusText);
        }
    }
    //req.abort = function ()
    //{
    //    $('#reqText').text("Request has canceled");
    //}
    req.send(JSON.stringify({ "name": userForSend.name, "password": userForSend.password }));
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
    // var req = new XMLHttpRequest();
    // req.open("Get", "https://reqres.in/api/users");
    // req.onreadystatechange = function()
    // {
    //     if(req.readyState == XMLHttpRequest.DONE)
    //     {
    //         totPages = JSON.parse(req.responseText).total_pages; 
    //     }
    // }
    // req.send();
    let user = {};
    $("#form").submit(function () {
        user.name = $("#name").val();
        user.password = $("#password").val();
        openAndSendPostRequest("https://reqres.in/api/users", user);
    });

    $('#pagination').twbsPagination(
        {
            totalPages: 4,
            visiblePages: 3,
            next: 'Next',
            prev: 'Prev',
            onPageClick: function (event, page) 
            {
                openAndSendGetRequest("https://reqres.in/api/users?page=", page);
            }  
    }); 
});


