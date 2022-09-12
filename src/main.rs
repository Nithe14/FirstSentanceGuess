use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Read;
#[macro_use]
extern crate rocket;

#[derive(Serialize, Deserialize)]
struct BlogPost {
    id: i32,
    title: String,
    body: String,
    published: bool,
}

#[get("/random")]
fn get_random_blog_post() -> Json<BlogPost> {
    Json(BlogPost {
        id: 1,
        title: "My first post".to_string(),
        body: "This is my first post".to_string(),
        published: true,
    })
}

#[get("/")]
fn index() -> std::string::String {
    //&'static str {
    use rustc_serialize::json::Json;
    let mut file = File::open("text.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();

    let json = Json::from_str(&data).unwrap();
    json.find_path(&["Title"]).unwrap().to_string()
    //"Hello, world!"
}

#[launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    rocket
        .mount("/", routes![index])
        .mount("/", routes![get_random_blog_post])
}
