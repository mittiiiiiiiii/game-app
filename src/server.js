const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/game/results', (req, res) => {
  const { correctCount, mistypeCount, elapsedTime } = req.body;

  const accuracy = ((correctCount / (correctCount + mistypeCount)) * 100).toFixed(2);
  const averageKeystrokes = ((correctCount + mistypeCount) / elapsedTime).toFixed(2);

  res.json({
    elapsedTime: elapsedTime,
    correctCount: correctCount,
    mistypeCount: mistypeCount,
    accuracy: accuracy,
    averageKeystrokes: averageKeystrokes
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
