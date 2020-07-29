import { client, q } from '../config/db';

export const getAll = () =>
	client
		.query(q.Paginate(q.Match(q.Ref('indexes/getAllHighscores'))))
		.then((response) => {
			const resData = response.data;
			const getAllDataQuery = resData.map((ref) => {
				return q.Get(ref);
			});
			return client.query(getAllDataQuery).then((data) => data);
		})
		.catch((error) => console.error('Error: ', error.message));

export const createRecord = (name, score) =>
	client
		.query(
			q.Create(q.Collection('Highscore'), {
				data: {
                    name,
                    score,
				}
			})
		)
		.then((ret) => ret)
		.catch((error) => console.error('Error: ', error.message));
