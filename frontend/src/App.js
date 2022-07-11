import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [username, setUsername] = useState("")
  const [postId, setPostId] = useState(0)
  
  useEffect(() => {  
    const getPosts = async() => {
      let posts = await (await fetch("/posts")).json()
      setPosts(posts.posts)
    }

    getPosts()

  },[])

  const createPost = async(e) => {
    e.preventDefault()

    // CREATE A NEW POST OBJECT
    const post = {
      "title": title,
      "username": username,
      "content": content
    }
    // MAKE A POST REQUEST TO THE API AT /POSTS WITH THE POST OBJECT AS THE BODY
    const response = await fetch(
      "/posts", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      }
    )
    // USE THE RESPOSNE FROM THE FETCH REQUEST TO SETPOSTS
    const allPosts = await response.json()
    
    setPosts(allPosts.posts)

  }

  const deletePost = async(e) => {
    e.preventDefault()

    console.log(postId)

    const response = await fetch(`/posts/${postId}/delete`, {
        method: "POST"
      }
    )

    const allPosts = await response.json()
    setPosts(allPosts.posts)
  }
  
  return (
    <>
      <div className='original'>
          <h1 className="heading">Welcome to the Flask + React Starter App</h1>
          <h3 align="center">This website will allow you to view a list of Posts, create a new Post or delete one dynamically.</h3>
      </div>

      <div className="posts-container" x-data="{formTitle: 'string', formUsername: 'string', formContent: 'String'}">
          <div className="post-controls">
              <h2>Create a Post</h2>
              <form onSubmit={createPost} className="create-form">
                  <div>
                      <input type="text" name="title" placeholder="Title" required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      />
                  </div>
                  <div>
                      <input type="text" name="username" placeholder="Username" required 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      />
                  </div>
                  <div>
                      <textarea name="content" cols="30" rows="10" placeholder="Post a silly thought" required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                  </div>
                  <button>Create Post</button>
              </form>
          </div>
      
          <div className="list-of-posts-container">
              <h2>Posts</h2>
              <div className="list-of-posts">
                  {posts.map((post) => {
                    return (
                      <div className="single-post" key={post.id}>
                          <h2>{ post.title }</h2>
                          <p className="post-user">Posted by <em>{ post.username }</em></p>
                          <p className="post-content">{ post.content }</p>
                          <form className="user-controls" onSubmit={deletePost}>
                              <button onClick={() => setPostId(post.id)}>Delete</button>
                          </form>
                      </div>
                    )
                  })}
              </div>
          </div>
      </div>
    </>
  );
}

export default App;
