let questionId = 1;

function save_cache(){
    sessionStorage.setItem("questionId", questionId);
    sessionStorage.setItem("saved", true);
    sessionStorage.setItem("nextBookButtonState", document.getElementById("nextBookButton").hidden)
}

function load_cache(){
    if (!sessionStorage.saved) return;
    questionId = Number(sessionStorage.getItem("questionId"));
    document.getElementById("nextBookButton").hidden = Boolean(sessionStorage.getItem("nextBookButtonState"))
}

function get_id() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var id = urlParams.get("id");
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
    >`
    return `${template} ${sentence}</blur>`;
}

function unblur(element){
    element.style.filter = "blur(0px)";
}

function blurOnClick(element){
    element.style.color = "black";
    unblur(element);
    element.class = "blur_disabled";
}

function httpGet(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function set_sentences() {
    let sentences = [
        httpGet(`http://127.0.0.1:8000/sentence?id=${questionId}&s=Sentence${1}`).replace(/['"]+/g, ''),
        httpGet(`http://127.0.0.1:8000/sentence?id=${questionId}&s=Sentence${2}`).replace(/['"]+/g, ''),
        httpGet(`http://127.0.0.1:8000/sentence?id=${questionId}&s=Sentence${3}`).replace(/['"]+/g, '')
    ];
    document.getElementById("sen").innerHTML = `
            ${sentences[0]}
            ${blurTemplate(sentences[1])}
            ${blurTemplate(sentences[2])}`;
}
function get_book() {
    var url = `http://127.0.0.1:8000/title?id=${questionId}`;
    var res = httpGet(url);
    var json = JSON.parse(res);

    return json;
}

function check_book(){
    var book = get_book();
    var guess = document.getElementById('frm');
    var guessButton = document.getElementById("button1");
    var giveUpButton = document.getElementById("button2");
    var input = document.getElementById("field");

    if (guess.elements[0].value.toUpperCase() === book.title.replace(/['"]+/g, '').toUpperCase()
        || guess.elements[0].value.toUpperCase() === book.title_en.replace(/['"]+/g, '').toUpperCase()) {
        giveUpButton.hidden = true;
        guessButton.disabled = true;
        input.readOnly = true;
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
    guessButton.disabled = true;

    var giveUpButton = document.getElementById("button2");
    giveUpButton.hidden = true;
    //giveUpButton.parentNode.removeChild(giveUpButton);


    var input = document.getElementById("field");
    input.readOnly = true;

    document.getElementById("sen").innerHTML = "<p style='text-align: center'> Twoja książka to: </p>" + "<h3 style='text-align: center'>" + book.title.replace(/['"]+/g, '') + "</h3><p style='text-align: center'>" + book.author.replace(/['"]+/g, '') + "</p>";

}

function get_max_id(){
    var url = "http://127.0.0.1:8000/books-counter";
    var maxId = parseInt(httpGet(url));

    return maxId;
}

function reset_form() {
    document.getElementById("frm").reset();
    document.getElementById("button2").hidden = false;
    document.getElementById("button1").disabled = false;
    document.getElementById("field").readOnly = false;
}

function next_book_test(){
    let maxId = get_max_id();
    let nextId = questionId+1;
    if (nextId >= maxId){
        document.getElementById("nextBookButton").hidden = true;
    }
    reset_form();
    questionId++;
    set_sentences();
    save_cache();
}

function next_book(){
    var id = parseInt(get_id());
    var maxId = get_max_id();
    var newId = id + 1;
    if (newId <= maxId ) {
        location.href = `/?id=${newId}`;
    }

}
