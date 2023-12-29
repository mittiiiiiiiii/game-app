const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 4000;
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/dbname', { useNewUrlParser: true, useUnifiedTopology: true });

const resultSchema = new mongoose.Schema({
    elapsedTime: Number,
    correctCount: Number,
    averageKeystrokes: Number,
    mistypeCount: Number,
    accuracy: Number
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

app.get('/db/results/last', async (req, res) => {
    const lastResult = await Result.findOne().sort('-createdAt');
    res.json(lastResult);
});

app.post('/db/results/save', async (req, res) => {
    const result = new Result(req.body);
    await result.save();
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});