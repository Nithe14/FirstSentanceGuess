# FirstSentanceGuess App

A super simple web app based on BookTube (Youtube but only books) First Sentance Challange. The app is made in Rust (Rocket) and pure Javascript. Frontend is awful for now, but I think it works. I'll make it pretty in the future, I promise!

## Prerequisities

- rustc 1.63.0

- cargo 1.63.0

#### Dependencies

- serde 1.0.140

- rustc-serialize 0.3.24

- serde_json 1.0.85

- rocket 0.5.0

## Quick Start

Update books database by editing `text.json`. For now `id` must be an iterator. DB structure is following:

```json
"<id>" {
    "Title": "<Native-Language-Title",
    "TitleEN": "<English-Title",
    "Sentance1": "<First Sentance of the book>",
    "Sentance2": "<Second Sentance of the book>",
    "Sentance3": "<Third Sentance of the book>",
},
"<next-id>" {
    ...
} // and so on
```

 

Run this commands to run the app:

```bash
git clone https://github.com/Nithe14/FirstSentanceGuess.git
cd FirstSentanceGuess
cargo run
```

Go to your browser at: `127.0.0.1:8000`  and start play the game!


