import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '@/interfaces/user.interface';
import { UserRoomInterface } from '@/interfaces/user-room.interface';

const initialState: {
  user: UserInterface | null;
} = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      const data: { user: UserInterface } = action.payload;
      state.user = data.user;
    },
    updateUserReducer: (state, action) => {
      const data: { user: UserInterface } = action.payload;

      state.user = { ...state.user, ...data.user };
    },
    addUserRoomReducer: (state, action) => {
      const data: { userRoom: UserRoomInterface } = action.payload;

      if (state.user) {
        state.user = {
          ...state.user,
          userRooms: state.user?.userRooms
            ? [...state.user.userRooms, data.userRoom]
            : [data.userRoom],
        };
      }
    },
  },
});

export const { setUserReducer, updateUserReducer } = userSlice.actions;

export default userSlice.reducer;
