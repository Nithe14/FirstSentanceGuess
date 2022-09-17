function httpGet(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function get_sentance() {
    var senNumb = document.getElementById('button').value;
    switch (senNumb) {
        case "1":
            document.getElementById('button').value = "2";
            senNumb = "1";
            break;
        case "2":
            document.getElementById('button').value = "3";
            senNumb = "2";
            break;
        case "3":
            senNumb = "3";
            var button = document.getElementById("button");
            button.parentNode.removeChild(button);
            //document.getElementById('button').removeChilden = "true";
            break;
    }
    var url = `http://127.0.0.1:8000/sentance?id=1&s=Sentance${senNumb}`;
    var res = httpGet(url)
    document.getElementById("content").innerHTML+= res.replace(/['"]+/g, '') + "<br>";
}

function get_book() {
    var url = "http://127.0.0.1:8000/title?id=1";
    var res = httpGet(url);
    button = document.getElementById("button1");
    button.parentNode.removeChild(button);
    var json = JSON.parse(res);

    document.getElementById("content").innerHTML += "<h3>" + json.title.replace(/['"]+/g, '') +"<br>"+ json.author.replace(/['"]+/g, '') +  "</h3>"
}
