import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceState {
  symbol: string;
  prices: any[];
}

const initialState: PriceState = {
  symbol: 'BTC',
  prices: [],
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
    setPrices(state, action: PayloadAction<any[]>) {
      state.prices = action.payload;
    },
  },
});

export const { setSymbol, setPrices } = priceSlice.actions;
export default priceSlice.reducer;
