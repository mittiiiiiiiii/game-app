import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3001/api/game/results', (req, res, ctx) => {
    const { correctCount, mistypeCount, elapsedTime } = req.body;

    const accuracy = ((correctCount / (correctCount + mistypeCount)) * 100).toFixed(2);
    const averageKeystrokes = ((correctCount + mistypeCount) / elapsedTime).toFixed(2);

    return res(
      ctx.json({
        elapsedTime: elapsedTime,
        correctCount: correctCount,
        mistypeCount: mistypeCount,
        accuracy: accuracy,
        averageKeystrokes: averageKeystrokes
      })
    );
  }),
];
