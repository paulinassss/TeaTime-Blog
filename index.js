import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    if (posts.length > 0) {
        console.log('Yes');
        res.render('index.ejs', {pageName: "Home",
                                 posts});
    } else {
        console.log('No');
        res.render('index.ejs', {pageName: "Home"});
    }
});

app.get('/create', (req, res) => {
    res.render('create.ejs', {pageName: "Create a post"});
});

app.post('/submit', (req, res) => {
    let flag = false; /* false - new poost, true - edited post */
    const title = req.body['title'];
    const content = req.body['content'];
    if (req.body['index'] == 100){
        posts.push({title, content});
    } else {
        posts[req.body['index']].title = title;
        posts[req.body['index']].content = content;
        flag = true;
    }
    res.render('done.ejs', {pageName: "What's next?", flag});
});

app.post('/edit', (req, res) => {
    const index = posts.findIndex(post => {
        return post.title == req.body['title'] && post.content == req.body['content'];
    });
    console.log(index);
    res.render('create.ejs', {pageName: "Edit a post",
                                title: req.body['title'],
                                content: req.body['content'],
                                index});
});

app.post('/delete', (req, res) => {
    const index = posts.findIndex(post => {
        return post.title == req.body['title'] && post.content == req.body['content'];
    });
    let newPosts = [];
    for (let i = 0; i < posts.length; i++){
        if (i != index) {
            newPosts.push(posts[i]);
        }
    }
    console.log(newPosts);
    res.render('index.ejs', {pageName: "Home", posts: newPosts})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
