const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 4000;
app.use(express.json());

const sequelize = new Sequelize('postgres://postgres:postgresSuperUserPsw@mypostgres:5432/dbname');

app.get('/results/last', async (req, res) => {
    const lastResult = await Result.findOne({ order: [['createdAt', 'DESC']] });
    res.json(lastResult);
});

const Result = sequelize.define('result', {
    elapsedTime: Sequelize.FLOAT,
    correctCount: Sequelize.INTEGER,
    averageKeystrokes: Sequelize.FLOAT,
    mistypeCount: Sequelize.INTEGER,
    accuracy: Sequelize.FLOAT
});

sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

app.post('/results/save', async (req, res) => {
    const result = await Result.create(req.body);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});