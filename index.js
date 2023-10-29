import express from 'express';

console.log('START');

const app = express();
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => `Server started ${PORT}`)

//app.use(cors());
app.use(express.static('public'))
app.use(express.json())


console.log(`Server started on ${PORT}`)
