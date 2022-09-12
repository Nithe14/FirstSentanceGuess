use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Read;
#[macro_use]
extern crate rocket;

#[get("/?<id>&<s>")]
fn index(id: String, s: String) -> std::string::String {
    //&'static str {
    use rustc_serialize::json::Json;
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let json = Json::from_str(&data).unwrap();
    //json.find_path(&["Title"]).unwrap().to_string()
    let book = json.find_path(&[id.as_str()]).unwrap();
    book.find_path(&[s.as_str()]).unwrap().to_string()
    //"Hello, world!"
}

#[launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    rocket.mount("/", routes![index])
}
