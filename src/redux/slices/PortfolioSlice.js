import { createSlice } from '@reduxjs/toolkit'
import { formatTime } from '../../utils/helpers';
// import {formatTime} from '../../utils/helpers'

const STORAGE_KEY = "portfolioState";

    const loadState = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { watchlist: [], holdings: [], totalPrice: {}, lastUpdated: null };
      } catch (err) {
        console.error("Error loading state:", err);
        return { watchlist: [], holdings: [], totalPrice: {}, lastUpdated: null };
      }
    };

    const initialState = loadState();

    const portfolioSlice = createSlice({
      name: "portfolio",
      initialState,
      reducers: {
        addToken: (state, action) => {
          const payload = action.payload;
        
          const tokens = Array.isArray(payload) ? payload : [payload];
        
          tokens.forEach((token) => {
            const exists = state.watchlist.find((t) => t.id === token.id);
            if (!exists) {
              state.watchlist.push(token);
              state.holdings.push({
                id: token.id,
                holdingAmount: 0,
              });
            } else {
              state.watchlist = state.watchlist.filter((t) => t.id == token.id);
              state.holdings = state.holdings.filter((h) => h.id == token.id);
            }
          });

          const timeStamp = new Date().toISOString()
          state.lastUpdated = formatTime(timeStamp);
        },
        updateHoldings: (state, action) => {
          const { id, amount } = action.payload;
        
          // find the holding by id
          const holding = state.holdings.find((h) => h.id === id);
        
          if (holding) {
            holding.holdingAmount = amount;
          } else {
            // optional: if holding doesn't exist, create it
            state.holdings.push({ id, holdingAmount: amount });
          }

          const timeStamp = new Date().toISOString()
          state.lastUpdated = formatTime(timeStamp);
        },
        deleteToken: (state, action) => {
          const id = action.payload;
        
          // Remove from watchlist
          state.watchlist = state.watchlist.filter((t) => t.id !== id);
          const timeStamp = new Date().toISOString()
          // Remove from holdings
          state.holdings = state.holdings.filter((h) => h.id !== id);
          state.lastUpdated = formatTime(timeStamp);
        },
        setPrices: (state, action) => {
          const { id, value } = action.payload;
        
          state.prices = {
            ...state.prices,
            [id]: {
              ...(state.prices[id] || {}),
              value,
            },
          };
        
          state.totalPrice = Object.values(state.prices).reduce(
            (acc, curr) => acc + (curr.value || 0),
            0
          );

          const timeStamp = new Date().toISOString()
          state.lastUpdated = formatTime(timeStamp);
        },
        clearPortfolio: (state) => {
          state.watchlist = [];
          state.holdings = {};
          state.prices = {};
          state.lastUpdated = null;
        },
      },
    });
    
    export const tokensList = (state) => {
      return state.portfolio.watchlist || []
    }

    export const selectPortfolioTotal = (state) => {
      return state.portfolio.watchlist.reduce((total, id) => {
        const holdings = state.portfolio.holdings[id] || 0;
        const price = state.portfolio.prices[id]?.current_price || 0;
        return total + holdings * price;
      }, 0);
    };

    export const { addToken, deleteToken, updateHoldings, setPrices, clearPortfolio } =
    portfolioSlice.actions;
  
  export default portfolioSlice.reducer;