import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../lib/mongodb";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

type StreamsData = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StreamsData>
) {
  const { database } = await connectToDatabase();
  const streams = database.collection("streams");

  let results;

  switch (req.method) {
    case 'POST':
      let reqBody = JSON.parse(req.body);
      let newObj = await streams.insertOne(reqBody);
      results = newObj;
      break;

    case 'GET':
      const timestamp: any = req.query.timestamp;
      const startTs = dayjs.utc(timestamp).startOf('day');
      const endTs = startTs.endOf('day');

      results = await streams.find({
        timestamp: {
          $gte: startTs.format(),
          $lt: endTs.format()
        }
      })
      .limit(10).toArray();
      break;
  }

  res.status(200).json(results);

}
