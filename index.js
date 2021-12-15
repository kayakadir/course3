const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  console.log(request.headers);
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  console.log(request.headers);
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) response.json(note);
  else response.status(404).end(); // no need to response message
});

app.delete("/api/notes/:id", (request, response) => {
  console.log(request.headers);
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end(); // no need to response message
});

// Define a helper function
const generateId = () => {
  let maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1
}

app.get('/new', (req, res) => {
  console.log("Hello world")
  res.end()
})

app.post("/api/notes", (request, response) => {
  // add new post
  const body = request.body
  if(!body.content){ // musn not be empty
    return response.status(400).json({
      error: "Content missing"
    })
  } 
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)

});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
