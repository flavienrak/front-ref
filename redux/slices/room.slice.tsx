import { createSlice } from '@reduxjs/toolkit';
import { UserRoomInterface } from '@/interfaces/user-room.interface';
import { VoteInterface } from '@/interfaces/vote.interface';
import { RoomInterface } from '@/interfaces/room.interface';
import { CardInterface } from '@/interfaces/card.interface';

const initialState: {
  userRooms: UserRoomInterface[];
  rooms: RoomInterface[];
  room: RoomInterface | null;
  vote: VoteInterface | null;
} = {
  userRooms: [],
  rooms: [],
  room: null,
  vote: null,
};

const roomSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRoomsReducer: (state, action) => {
      const data: { userRooms: UserRoomInterface[] } = action.payload;

      state.userRooms = data.userRooms;
    },
    setRoomsReducer: (state, action) => {
      const data: { rooms: RoomInterface[] } = action.payload;

      state.rooms = data.rooms;
    },
    setRoomReducer: (state, action) => {
      const data: { room: RoomInterface } = action.payload;

      state.room = data.room;
    },
    setVoteReducer: (state, action) => {
      const data: { vote: VoteInterface } = action.payload;

      state.vote = data.vote;
    },
    updateVoteReducer: (state, action) => {
      const data: { vote: VoteInterface } = action.payload;

      if (state.vote) {
        state.vote = { ...state.vote, ...data.vote };
      }
    },

    updateCardReducer: (state, action) => {
      const data: { card: CardInterface } = action.payload;

      if (state.vote) {
        const cardIndex = state.vote.cards.findIndex(
          (item) => item.id === data.card.id,
        );

        let updatedCards;
        if (cardIndex !== -1) {
          updatedCards = [...state.vote.cards];
          updatedCards[cardIndex] = data.card;
        } else {
          updatedCards = [...state.vote.cards, data.card];
        }

        state.vote = {
          ...state.vote,
          cards: updatedCards,
        };
      }
    },
  },
});

export const {
  setUserRoomsReducer,
  setRoomsReducer,
  setRoomReducer,
  setVoteReducer,
  updateVoteReducer,
  updateCardReducer,
} = roomSlice.actions;

export default roomSlice.reducer;
