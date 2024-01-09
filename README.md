# Whatch This app

This work proposes a minimalist Web system that allows a user who is undecided about what to watch to receive quick recommendations of Anime based on their taste or other animations. The proposed name is Watch This!

(home)[https://raw.githubusercontent.com/Olavo-B/watch-this/master/misc/img/home.jpeg]


# Version

1.0.0

## TODO

### Mandatory features

| Feature                                                                                                  | Status |
| -------------------------------------------------------------------------------------------------------- | ------ |
| Functional search bar                                                                                    |  ✅   |
| Login page                                                                                               |  ✅    |
| Sign up page                                                                                             |  ✅    |
| Search result page                                                                                       |  ✅    |
| Catalogue page                                                                                           |  ✅    |
| User profile                                                                                             |  ✅    |
| Edit catalogue                                                                                           |  ✅    |
| Add new anime to catalogue                                                                               |  ✅    |
| Make search engine  - backend                                                                            |  ✅    |
| Make database - backend                                                                                  |  ✅    |

### Optional features
| Feature                                                                                                  | Status |
| -------------------------------------------------------------------------------------------------------- | ------ |
| Nocturnal mode with background image change                                                              |  🙏🏻    |
| Random anime recommendation when clicking on the logo                                                    |  🙏🏻    |
| Autocomplete search bar                                                                                  |  🙏🏻    |    

- ✅ = Ready to use
- ⏳ = In progress
- 🙏🏻 = Looking for contributors

# How it works

One of the fundamental parts of this project is the search engine, that is, the method that will be used to generate recommendations. The initial approach involves the use of a technique known as collaborative filtering, implemented based on cosine similarity and using the K-Nearest Neighbors (KNN) algorithm.

# Stack

- [React](https://reactjs.org/)
- [Jikan API](https://jikan.moe/)
- [Fastify](https://www.fastify.io/)
- [PostgreSQL](https://www.postgresql.org/)

# Build Instructions

If you would like to work on the open source code, please do feel free to submit a pull request! Make sure you're following Javascript ES6 syntax and modularize your code as much as possible.

To get started, first _fork_ the repo to your personal github repos, then run the following commands:

```shell
git clone https://github.com/Olavo-B/watch-this.git
```

```shell
npm install
```

```shell
npm start
```
```

# <a href="#privacy">Privacy</a>
