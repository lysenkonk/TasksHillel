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

function openAndSendRequest(typeRequest, url, page)
{
    var request = new XMLHttpRequest();
    request.open(typeRequest, url + page);
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
    // req.open("Get", "https://reqres.in/api/users", false);
    // req.onreadystatechange = function()
    // {
    //     if(req.readyState == XMLHttpRequest.DONE)
    //     {
    //         totPages = JSON.parse(req.responseText).total_pages; 
    //     }
    // }
    // req.send();

    $('#pagination').twbsPagination(
        {
            totalPages: 4,
            visiblePages: 3,
            next: 'Next',
            prev: 'Prev',
            onPageClick: function (event, page) 
            {
                openAndSendRequest("Get", "https://reqres.in/api/users?page=", page);
            }  
    }); 
});


