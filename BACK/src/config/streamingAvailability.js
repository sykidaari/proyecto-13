import { Client, Configuration } from 'streaming-availability';

const streamingAvailabilityClient = new Client(
  new Configuration({
    apiKey: process.env.RAPID_API_KEY
  })
);

export default streamingAvailabilityClient;
