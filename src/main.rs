use rocket::fs::{relative, FileServer};
use rocket::serde::json::Json;
//use rocket_contrib::json::JsonValue;
use rustc_serialize::json::Json as rustcJson;
use serde::{Deserialize, Serialize};
//use serde_json::{Result, Value};
use std::fs::File;
//use std::io::BufReader;
use std::io::Read;
#[macro_use]
extern crate rocket;

#[derive(Serialize, Deserialize)]
struct Book {
    title: String,
    title_en: String,
    author: String,
    ganre: String,
    sentences: [String; 3],
}
#[get("/books-counter")]
fn get_books_count() -> String {
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();

    file.read_to_string(&mut data).unwrap();

    let json = rustcJson::from_str(&data).unwrap();

    json.as_object().unwrap().len().to_string()
}

#[get("/sentence?<id>&<s>")]
fn get_sentence(id: String, s: String) -> std::string::String {
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let json = rustcJson::from_str(&data).unwrap();

    let book = json.find_path(&[id.as_str()]).unwrap();
    book.find_path(&[s.as_str()]).unwrap().to_string()
}

#[get("/title?<id>")]
fn get_title(id: String) -> Json<Book> {
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let json = rustcJson::from_str(&data).unwrap();
    let book = json.find_path(&[id.as_str()]).unwrap();

    Json(Book {
        title: book.find_path(&["Title"]).unwrap().to_string(),
        title_en: book.find_path(&["TitleEN"]).unwrap().to_string(),
        author: book.find_path(&["Author"]).unwrap().to_string(),
        ganre: book.find_path(&["Ganre"]).unwrap().to_string(),
        sentences: [
            book.find_path(&["Sentence1"]).unwrap().to_string(),
            book.find_path(&["Sentence2"]).unwrap().to_string(),
            book.find_path(&["Sentence3"]).unwrap().to_string(),
        ],
    })
}

#[launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    rocket
        .mount("/", routes![get_sentence, get_title, get_books_count])
        .mount("/", FileServer::from(relative!("static")))
}
