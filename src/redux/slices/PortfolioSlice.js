import { createSlice } from '@reduxjs/toolkit'
import { formatTime } from '../../utils/helpers';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY

    const loadState = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { watchlist: [], holdings: [], totalPrice: 0, lastUpdated: null };
      } catch (err) {
        console.error("Error loading state:", err);
        return { watchlist: [], holdings: [], totalPrice: 0, lastUpdated: null };
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
          portfolioSlice.caseReducers.recalculateTotal(state)
        },
        updateHoldings: (state, action) => {
          const { id, amount } = action.payload;
        
          const holding = state.holdings.find((h) => h.id === id);
        
          if (holding) {
            holding.holdingAmount = amount;
          } else {
            state.holdings.push({ id, holdingAmount: amount });
          }

          const timeStamp = new Date().toISOString()
          state.lastUpdated = formatTime(timeStamp);
          portfolioSlice.caseReducers.recalculateTotal(state)
        },
        deleteToken: (state, action) => {
          const id = action.payload;
          state.watchlist = state.watchlist.filter((t) => t.id !== id);
          const timeStamp = new Date().toISOString()
          state.holdings = state.holdings.filter((h) => h.id !== id);
          state.lastUpdated = formatTime(timeStamp);
          portfolioSlice.caseReducers.recalculateTotal(state)
        },
        clearPortfolio: (state) => {
          state.watchlist = [];
          state.holdings = {};
          state.prices = {};
          state.lastUpdated = null;
        },
        recalculateTotal: (state) => {
          let total = 0;
    
          state.watchlist.forEach((item) => {
            const holding = state.holdings.find((h) => h.id === item.id);
            const value = item.current_price * (holding?.holdingAmount ?? 0);
            total += value;
          });
    
          state.totalPrice = total;
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