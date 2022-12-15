import { MongoClient } from 'mongodb'

declare global {
  var _mongoClient: Promise<MongoClient>
}
