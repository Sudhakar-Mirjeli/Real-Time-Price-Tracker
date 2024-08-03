# Real-Time Price Tracker
Hi, I'm Sudhakar Mirjeli, having 3+ years of experience in Web development, I have designed a website to collect and display real-time price data for stocks. 

## Overview

This project is a mini-website designed to collect and display real-time price data for stocks or cryptocurrencies. It uses the LiveCoinWatch API to fetch data, stores it in a MongoDB database, and displays the most recent 20 entries in a dynamic table on the frontend. The application is built with Next.js, TypeScript, and Redux.


## Technologies Used

- **Frontend**: Next.js, TypeScript, Redux
- **Backend**: Next.js API routes, Axios
- **Database**: MongoDB
- **API**: LiveCoinWatch

## Features

- Poll real-time data every few seconds for 5 stocks or cryptocurrencies (e.g., BTC,LINK) from the LiveCoinWatch API.
- Store the data in a MongoDB database.
- Fetch the most recent 20 real-time data entries from the MongoDB database for a particular stock or crypto and display them in a table.
- The table updates its values in real-time according to new data.
- A modal/popup allows users to change the stock or crypto being tracked.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- LiveCoinWatch API Key

### Installation

1. Clone the repository:
   ```bash
 

2.Install dependencies:
  npm install

3.Create a .env.local file in the root directory and add your MongoDB URI and LiveCoinWatch API Key:
  MONGODB_URI=your_mongodb_uri
 LIVE_COIN_WATCH_API_KEY=your_livecoinwatch_api_key

4.Start the development server:
 npm run dev


**Project Structure**

    pages/api: Contains API routes for fetching and storing price data.
        updateAndFetchPrices.ts: Fetches data from LiveCoinWatch API, saves it to MongoDB, and returns the latest 20 records.
    redux: Contains Redux setup including actions, reducers, and store configuration.
        priceSlice.ts: Manages state for symbols and prices.
        store.ts: Configures the Redux store.
    components: Contains React components used in the application.
        Home.tsx: Main component displaying the real-time price tracker table and modal for changing symbols.
