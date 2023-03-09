use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct InputForm {
    pub id: String,
    pub title: String,
}
