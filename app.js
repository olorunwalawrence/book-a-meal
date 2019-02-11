import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = parseInt(process.env.PORT, 10) || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/v1', (req, res) => res.status(200).json({
  message: 'this is the application home page'
}));

app.route('/*').all((req, res) => res.status(404).json({
  status: 404,
  error: '404 Route not found'
}));

app.listen(port, (err) => {
  console.log('server is up and running');
});
