import { configureStore } from '@reduxjs/toolkit';
import { studentApi } from '../services/profile/user.profile.service';
import authSlice from '../services/auth/authSlice';
import { subjectApi } from '../services/subject/subject.service';
import { skillApi } from '../services/skill/skill.service';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [skillApi.reducerPath]: skillApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentApi.middleware, 
      skillApi.middleware, 
      subjectApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;