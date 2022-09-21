function get_id() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var id = urlParams.get("id");
    console.log(id);
    if (id == null) {
        return 0;
    } else {
        return id;
    }
}

function httpGet(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function get_sentance() {
    var senNumb = document.getElementById('button').value;
    var id = get_id();
    switch (senNumb) {
        case "Pokaż pierwsze zdanie":
            document.getElementById('button').value = "Pokaż drugie zdanie";
            senNumb = "1";
            break;
        case "Pokaż drugie zdanie":
            document.getElementById('button').value = "Pokaż trzecie zdanie";
            senNumb = "2";
            break;
        case "Pokaż trzecie zdanie":
            senNumb = "3";
            var button = document.getElementById("button");
            button.parentNode.removeChild(button);
            //document.getElementById('button').removeChilden = "true";
            break;
    }
    var url = `http://127.0.0.1:8000/sentance?id=${id}&s=Sentance${senNumb}`;
    var res = httpGet(url)
    document.getElementById("content").innerHTML+= res.replace(/['"]+/g, '') + "<br>";
}

function get_book() {
    var id = get_id();
    var url = `http://127.0.0.1:8000/title?id=${id}`;
    var res = httpGet(url);
    //button = document.getElementById("button1");
    //button.parentNode.removeChild(button);
    var json = JSON.parse(res);

    return json;

    //document.getElementById("content").innerHTML += "<h3>" + json.title.replace(/['"]+/g, '') +"<br>"+ json.author.replace(/['"]+/g, '') +  "</h3>"
}

function check_book(){
    var book = get_book();
    var guess = document.getElementById('frm');

    if ( guess.elements[0].value.toUpperCase() == book.title.replace(/['"]+/g, '').toUpperCase()  || guess.elements[0].value.toUpperCase() == book.title_en.replace(/['"]+/g, '').toUpperCase()){
        document.getElementById("title").innerHTML = "<h3> Dobrze! Książka to: </h3>"  +
            "<h4>" + book.title.replace(/['"]+/g, '') + "<br>" + book.author.replace(/['"]+/g, '') + "</h4>";
    }

    else {
         document.getElementById("title").innerHTML = "<h3>"+guess.elements[0].value + " to błędna odpowiedź. Spróbuj ponownie!</h3> <br>";
    }
}

function give_up(){
    var book = get_book();

    var guess_button = document.getElementById("button1");
    guess_button.parentNode.removeChild(guess_button);

    var give_up_button = document.getElementById("button2");
    give_up_button.parentNode.removeChild(give_up_button);

    var field = document.getElementById("frm");
    field.parentNode.removeChild(field);

    document.getElementById("title").innerHTML = "<h3> Twoja książka to: </h3>" + "<h4>" + book.title.replace(/['"]+/g, '') + "<br>" + book.author.replace(/['"]+/g, '') + "</h4>";

}

function get_max_id(){
    var url = "http://127.0.0.1:8000/books-counter";
    var max_id = parseInt(httpGet(url));

    return max_id;
}

function next_book(){
    var id = parseInt(get_id());
    var max_id = get_max_id();
    var new_id = id + 1;
    if (new_id <= max_id ) {
        location.href = `/?id=${new_id}`
    }
}
