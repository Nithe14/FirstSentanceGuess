let questionId = 1;

function get_id() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var id = urlParams.get("id");
    //console.log(id);
    if (id == null) {
        return 0;
    } else {
        return id;
    }
}

function blurTemplate(sentence){
    const template = 
    `<blur
        onclick="blurOnClick(this)"
        onmouseover="blurOnMouseOver(this)"
        onmouseout="blurOnMouseOut(this)"
    >`
    return `${template} ${sentence}</blur>`;
}

function unblur(element){
    element.style.filter = "blur(0px)";
}

function blurOnClick(element){
    element.style.color = "black";
    unblur(element);
    element.class = "blur_disabled"
}

function blurOnMouseOver(element){
    if (element.class === "blur_disabled")  return;
    element.style.color = "#D3A0A7";
}

function blurOnMouseOut(element){
    if (element.class === "blur_disabled")  return;
    element.style.color = "black";
}

function httpGet(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function set_sentances() {
    let sentences = [
        httpGet(`http://127.0.0.1:8000/sentance?id=${questionId}&s=Sentance${1}`).replace(/['"]+/g, ''), 
        httpGet(`http://127.0.0.1:8000/sentance?id=${questionId}&s=Sentance${2}`).replace(/['"]+/g, ''), 
        httpGet(`http://127.0.0.1:8000/sentance?id=${questionId}&s=Sentance${3}`).replace(/['"]+/g, '')
    ];
    document.getElementById("sen").innerHTML = `
            ${sentences[0]}
            ${blurTemplate(sentences[1])}
            ${blurTemplate(sentences[2])}`;
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
    var res = httpGet(url);
    document.getElementById("sen").innerHTML+= res.replace(/['"]+/g, '') + "<br>";
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

    if (guess.elements[0].value.toUpperCase() === book.title.replace(/['"]+/g, '').toUpperCase()
        || guess.elements[0].value.toUpperCase() === book.title_en.replace(/['"]+/g, '').toUpperCase()) {
        document.getElementById("sen").innerHTML = "<p style='text-align: center'> Dobrze! </p>"  +
            "<h3 style='text-align: center'>" + book.title.replace(/['"]+/g, '') + "</h3><p style='text-align: center'>" + book.author.replace(/['"]+/g, '') + "</p>";
    }

    else {
         guess.classList.add("apply-shake");
         //document.getElementById("title").innerHTML = "<h3>"+guess.elements[0].value + " to błędna odpowiedź. Spróbuj ponownie!</h3> <br>";
        guess.addEventListener("animationend", (e) => {
            guess.classList.remove("apply-shake");
        });
    }
}

function give_up(){
    var book = get_book();

    var guessButton = document.getElementById("button1");
    guessButton.parentNode.removeChild(guessButton);

    var giveUpButton = document.getElementById("button2");
    giveUpButton.parentNode.removeChild(giveUpButton);

    var field = document.getElementById("frm");
    field.parentNode.removeChild(field);

    document.getElementById("sen").innerHTML = "<h3> Twoja książka to: </h3>" + "<h4>" + book.title.replace(/['"]+/g, '') + "<br>" + book.author.replace(/['"]+/g, '') + "</h4>";

}

function get_max_id(){
    var url = "http://127.0.0.1:8000/books-counter";
    var maxId = parseInt(httpGet(url));

    return maxId;
}

function next_book_test(){
    questionId++;
    set_sentances();
}

function next_book(){
    var id = parseInt(get_id());
    var maxId = get_max_id();
    var newId = id + 1;
    if (newId <= maxId ) {
        location.href = `/?id=${newId}`;
    }
    
}
