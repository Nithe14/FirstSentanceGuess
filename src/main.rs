use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Read;
#[macro_use]
extern crate rocket;

#[derive(Serialize, Deserialize)]
struct Book {
    title: String,
    author: String,
}

#[get("/sentance?<id>&<s>")]
fn get_sentance(id: String, s: String) -> std::string::String {
    use rustc_serialize::json::Json;
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let json = Json::from_str(&data).unwrap();
    let book = json.find_path(&[id.as_str()]).unwrap();
    book.find_path(&[s.as_str()]).unwrap().to_string()
}

#[get("/title?<id>")]
fn get_title(id: String) -> Json<Book> {
    use rustc_serialize::json::Json;
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let json = Json::from_str(&data).unwrap();
    let book = json.find_path(&[id.as_str()]).unwrap();

    Json(Book {
        title: book.find_path(&["Title"]).unwrap().to_string(),
        author: book.find_path(&["Author"]).unwrap().to_string(),
    })
}

#[get("/")]
fn index() -> String {
    "Witaj na stronie FirstSentanceGuess".to_string()
}

#[launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    rocket.mount("/", routes![index, get_sentance, get_title])
}
