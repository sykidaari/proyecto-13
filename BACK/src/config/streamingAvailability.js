import { Client, Configuration } from 'streaming-availability';
import dotenv from 'dotenv';
dotenv.config();

const streamingAvailabilityClient = new Client(
  new Configuration({
    apiKey: process.env.RAPID_API_KEY
  })
);

export default streamingAvailabilityClient;
