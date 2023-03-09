use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct ValidationResponse {
    pub is_correct: bool,
    pub title: Option<String>,
    pub title_en: Option<String>,
    pub author: Option<String>,
}
