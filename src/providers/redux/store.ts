import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '@/redux/slices/emptySplitApi';

export const store = configureStore({
  reducer,
});
