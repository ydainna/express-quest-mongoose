const express = require("express")
const mongoose = require("mongoose") 
const Post = require("./models/Post")

// Connect to MongoDB database
mongoose
	.connect("mongodb://127.0.0.1:27017/myBlog", { useNewUrlParser: true })
	.then(() => {
		const app = express();
       app.use(express.json()); // new line

       app.get("/posts", async (req, res) => {
	       const posts = await Post.find()
	       res.send(posts)
      })

      app.get("/posts/:id", async (req, res) => {
          const posts = await Post.findById(req.params.id)
          if (!posts) {
              return res.status(404).send({ error: "Post not found" })
          } else {
              res.send(posts)
          }
      })

      app.delete("/posts/:id", async (req, res) => {
          const posts = await Post.findByIdAndDelete(req.params.id)
          if (!posts) {
              return res.status(404).send({ error: "Post not found" })
          } else {
              res.send(posts)
          }
      })

       app.post("/posts", async (req, res) => {
        const post = new Post({
          title: req.body.title,
          content: req.body.content,
        });
        await post.save();
        res.send(post);
      });

		app.listen(3000, () => {
			console.log("Server has started!")
		})
  })
