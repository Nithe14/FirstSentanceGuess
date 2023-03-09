use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Book {
    pub title: String,
    pub title_en: String,
    pub author: String,
    pub ganre: String,
    pub sentences: [String; 3],
}
