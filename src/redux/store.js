import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from './slices/PortfolioSlice.js'

const STORAGE_KEY = "portfolioState";

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return undefined;
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  preloadedState: loadState()
});

store.subscribe(() => {
  saveState(store.getState().portfolio);
});