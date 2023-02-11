import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: any = req.query.weight;
  const height: any = req.query.height;
  try {
    const bmi = calculateBmi(height, weight);
    res.json({weight, height, bmi})
  } catch (e) {
    res.send('Something went wrong');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});