// pages/api/updateAndFetchPrices.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import mongoose from 'mongoose';
import {connectMongo} from '../../lib/mongoDBConnection';

// Define a schema and model for the price data
const priceSchema = new mongoose.Schema({
    symbol: String,
    name: String,
    price: Number,
    timestamp: Date

}, {
    collection: 'prices',
    // timestamps: true
});

const Price = mongoose.models.Price || mongoose.model('Price', priceSchema);

const updateAndFetchPrices = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();

  const { symbol } = req.query;
  const LIVE_COIN_WATCH_API_KEY = process.env.LIVE_COIN_WATCH_API_KEY;

  try {
    // Fetch data from the external API
    const url = `https://api.livecoinwatch.com/coins/list`;
    const response = await axios.post(
      url,
      {
        currency: 'USD',
        sort: 'rank',
        order: 'ascending',
        offset: 0,
        limit: 50,
        meta: true,
        code: symbol,
      },
      {
        headers: {
          'x-api-key': LIVE_COIN_WATCH_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const externalPrices = response.data;

    // Save data to the database
    const savePromises = externalPrices.map(async (priceData:any) => {
      const price = new Price({
        symbol: priceData.code,
        name: priceData.name,
        price: priceData.rate,
        timestamp: new Date(),
      });
      await price.save();
    });
    await Promise.all(savePromises);

    // Fetch the latest 20 records from the database
    const latestPrices = await Price.find({ symbol })
      .sort({ timestamp: -1 }) // Sort by timestamp descending
      .limit(20); // Limit to 20 most recent entries

    res.status(200).json(latestPrices);
  } catch (error) {
    console.error('Error in updateAndFetchPrices API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default updateAndFetchPrices;
