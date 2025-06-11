import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const overviewTemplate = fs.readFileSync(
  path.join(__dirname, '/public/overview.html'),
  'utf-8'
);
const toursData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/dev-data/data/tours-simple.json'))
);

app.use(express.json()); // Middleware para analisar JSON no corpo das requisições
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.status(200).send(overviewTemplate);
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length, // É uma boa prática incluir o número de resultados
    data: {
      tours: toursData,
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  // Adiciona o novo tour ao array de tours
  toursData.push(newTour);

  fs.writeFile(path.join(__dirname, '/dev-data/data/tours-simple.json'),
    JSON.stringify(toursData),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
  res.end('done!');
});