import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.status(200)
  .json({ message: 'Hello World!', app: 'natours_b' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint, but it does not do anything yet.');
}
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
