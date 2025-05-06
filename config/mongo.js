import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'eduflex';

async function getCourseContent(courseId) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('course_content');
  return await collection.find({ course_id: courseId }).toArray();
}

const _getCourseContent = getCourseContent;
export { _getCourseContent as getCourseContent };
