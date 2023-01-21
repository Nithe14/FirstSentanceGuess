# FirstSentanceGuess App

A super simple web app based on BookTube (Youtube but only books) First Sentance Challange. The app is made in Rust (Rocket) and pure Javascript. A Frontend has been made only for the video so it can be buggy. We'll make it better in the future. 

## Prerequisities

- rustc 1.63.0

- cargo 1.63.0

- or you can use docker

#### Dependencies

- serde 1.0.140

- rustc-serialize 0.3.24

- serde_json 1.0.85

- rocket 0.5.0

## Quick Start

Run this commands in your terminal to clone the app:

```bash
git clone https://github.com/Nithe14/FirstSentanceGuess.git
cd FirstSentanceGuess
```

Update books database by editing `text.json`. For now `id` must be an iterator (1, 2, 3,...n). DB structure is following:

```json
"<id>" {
    "Title": "<Native-Language-Title>",
    "TitleEN": "<English-Title>",
    "Author": "<N. Surname>",
    "Ganre": "<Ganre>"
    "Sentence1": "<First Sentance of the book>",
    "Sentence2": "<Second Sentance of the book>",
    "Sentence3": "<Third Sentance of the book>"
},
"<next-id>" {
    ...
}, //and so on...
"<last-id>" {
    ...
} //..until the last one
```

##### Run with cargo

Run this command to start the app:

```bash
cargo run
```

Go to your browser at: `127.0.0.1:8000`  and start play the game!

##### Run with docker

You have to build the image from `Dockerfile` for now. I'm going to make docker compose version in the future. Run this commands in your terminal:

```bash
docker build . -t <your-tag>
docker run -p 8000:8000 <your-tag>
```

Go to your browser at: `127.0.0.1:8000` and start play the game!
