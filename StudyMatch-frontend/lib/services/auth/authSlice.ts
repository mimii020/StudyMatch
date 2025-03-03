import { StudentProfile } from '@/lib/types/user.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: StudentProfile | null;
};

const initialState: AuthState = {
  token: null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<{token: string, user: StudentProfile}>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearCurrentUser: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;
export default authSlice;