use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct InputForm {
    pub id: String,
    pub title: String,
}

#[derive(Serialize, Deserialize)]
pub struct HelpInput {
    pub id: String,
    pub help_id: u8,
}
