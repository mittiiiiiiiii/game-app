import { rest } from 'msw';

export const handlers = [
  rest.post('http://koske-game.nip.io/api/game/results', (req, res, ctx) => {
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
