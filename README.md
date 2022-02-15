# Article-Storage-SPA

Simple Single Page Application for storing articles and their references using React, Node.js, Express.js, MySQL.

## Key Features

* Add, edit, delete articles + references (CRUD operations)
* Search (filter) articles by title and/or summary
* Order (sort) articles by title alphabetically
* Order (sort) articles by the latest ones (descending publication date)

### Prerequisites
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.
Use HeidiSQL or any other administration tool for MySQL. Also Postman was used for testing the routing on the server.

### How To Use

From your command line:
```bash
# Clone this repository
$ git clone https://github.com/theeejo/Article-Storage-SPA

# Go into the repository
$ cd Article-Storage-SPA

# Go into the backend
$ cd server

# Install dependencies
$ npm install

# Run the server
$ npm start

# Go into the frontend
$ cd ..
# cd gui

# Install dependencies
$ npm install

# Run the user interface
$ npm start
```

### Usage Demo

Adding, editing, deleting articles along with ordering and filtering them.

https://user-images.githubusercontent.com/89813870/154089277-4b81a8d9-02c5-4692-8267-d577ef9074a1.mp4

Adding, editing, deleting references for specific articles.

https://user-images.githubusercontent.com/89813870/154089290-058682ab-5e3f-4edb-9ae0-56b469829457.mp4

Seeing how the database stores the data with HeidiSQL. 

https://user-images.githubusercontent.com/89813870/154089296-059196d5-3b78-4118-9a95-5169592b661b.mp4


## Built With

* React
* Node.js + Express.js
* MySQL

## License

This project is licensed under the MIT License

