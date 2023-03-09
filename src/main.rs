use rocket::fs::{relative, FileServer};
use rocket::serde::json::Json;
use rustc_serialize::json::Json as rustcJson;
use std::fs::File;
use std::io::Read;

mod book;
use book::Book;
mod responses;
use responses::ValidationResponse;
mod forms;
use forms::InputForm;

#[macro_use]
extern crate rocket;

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

#[post("/check-book", format = "json", data = "<input_data>")]
fn check_book_by_id(input_data: Json<InputForm>) -> Json<ValidationResponse> {
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let json = rustcJson::from_str(&data).unwrap();
    let book = json.find_path(&[input_data.id.as_str()]).unwrap();

    let valid_title = book
        .find_path(&["Title"])
        .unwrap()
        .to_string()
        .trim_matches('\"')
        .to_string();
    let valid_title_en = book
        .find_path(&["TitleEN"])
        .unwrap()
        .to_string()
        .trim_matches('\"')
        .to_string();

    if input_data.title.to_uppercase() == valid_title.to_uppercase()
        || input_data.title.to_uppercase() == valid_title_en.to_uppercase()
    {
        Json(ValidationResponse {
            is_correct: true,
            title: Some(book.find_path(&["Title"]).unwrap().to_string()),
            title_en: Some(book.find_path(&["TitleEN"]).unwrap().to_string()),
            author: Some(book.find_path(&["Author"]).unwrap().to_string()),
        })
    } else {
        Json(ValidationResponse {
            is_correct: false,
            title: None,
            title_en: None,
            author: None,
        })
    }
}

#[launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    rocket
        .mount(
            "/",
            routes![get_sentence, get_title, get_books_count, check_book_by_id],
        )
        .mount("/", FileServer::from(relative!("static")))
}
