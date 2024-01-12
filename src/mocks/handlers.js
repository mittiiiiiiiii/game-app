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
  rest.get('http://koske-game.nip.io/db/results/last', (req, res, ctx) => {
    return res(ctx.json({
      elapsedTime: 100,
      correctCount: 50,
      averageKeystrokes: 0.5,
      mistypeCount: 10,
      accuracy: 80
    }));
  }),
  rest.post('http://koske-game.nip.io/db/results/save', (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
];