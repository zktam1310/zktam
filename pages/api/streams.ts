import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../lib/mongodb";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

type StreamsData = {
  name: string
}

async function getStreams(streams: any, timestamp: any) {
  let getStreams:any;

  if (timestamp) {
    const startTs = dayjs.utc(timestamp).startOf('day');
    const endTs = startTs.endOf('day');
    getStreams = await streams.find({
      timestamp: {
        $gte: startTs.format(),
        $lt: endTs.format()
      }
    }).sort( { timestamp: -1 } )
    .toArray();
  } else {
    getStreams = await streams.find().sort( { timestamp: -1 } ).toArray();
  }

  return getStreams;
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
      const reqBody = JSON.parse(req.body);
      const now: any = dayjs.utc().format();
      // add new stream
      if (reqBody.method == 'add') {
        let todayStreams = await getStreams(streams, now);
        let checkTodayDuplicate = todayStreams.some((stream: any) => stream["source_id"] == reqBody.source_id);
        if (!checkTodayDuplicate) {
          results = await streams.insertOne({
            source_id: reqBody.source_id,
            source: reqBody.source,
            timestamp: reqBody.timestamp
          });
        } else {
          results = {
            msg: "Video already been added for today."
          }
        }
      } else {
        // remove stream
        results = await streams.deleteOne({
          id: reqBody.id
        });
      }
      break;

    case 'GET':
      const timestamp: any = req.query.timestamp;
      results = await getStreams(streams, timestamp)
      break;
  }
  res.status(200).json(results);
}
