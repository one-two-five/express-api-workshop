const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

let movies = [
    {
      id: 1,
      name: "Pulp Fiction",
      cast: [
        { name: "John Travolta" },
        { name: "Uma Thurman" },
      ],
      year: 1994,
      imdbRating: 8.9,
    },
    {
      id: 2,
      name: "Lord of the Rings: TFOTR",
      cast: [
        { name: "Elijah Wood" },
        { name: "Cate Blanchett" },
        { name: "Ian McKellen" },
      ],
      year: 2001,
      imdbRating: 8.8,
    },
    {
      id: 3,
      name: "Back to the Future",
      cast: [
        { name: "Michael J. Fox" },
        { name: "Christopher Lloyd" },
        { name: "Lea Thompson" },
      ],
      year: 1985,
      imdbRating: 8.5,
    }
]

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.status(200).json({message: 'hello world'})
});

app.route('/movies')
  .get((req, res) => {
    if (req.query.name) {
      console.log('req.query.name', req.query.name);
      const match = movies.find(movie => movie.name === req.query.name);
      return res.status(200).json(match);
    };
    return res.status(200).json(movies)
  })
  .post((req, res) => {
    console.log('Got body:', req.body);

    movies.forEach(movie => {
      if ( movie.id === req.body.id ) return res.status(200).json({ message: `Movie id already exists`});
    });

    if( req.body && req.body.id && req.body.name ) {
      movies.push(req.body)
      return res.status(200).json({ message: `Added ${req.body.name}`})
    } else {
      return res.status(200).json({ message: `Could not add movie record, name and id required`})
    }
  });

app.route('/movies/:id')
.get((req, res) => {
  console.log(req.headers);
  const match = movies.find(movie => movie.id === parseInt(req.params.id));
  if (match) {
    return res.status(200).json(match);
  } 
  return res.status(404).json({message: "Movie not found"});
})

app.route('/movies/:id/cast')
.get((req, res) => {
  const match = movies.find(movie => movie.id === parseInt(req.params.id));
  return res.status(200).json(match.cast);
})

app.listen(port, () => console.log(`listening on ${port}`));