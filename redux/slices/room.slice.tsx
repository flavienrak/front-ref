import { createSlice } from '@reduxjs/toolkit';
import { UserRoomInterface } from '@/interfaces/user-room.interface';
import { VoteInterface } from '@/interfaces/vote.interface';
import { RoomInterface } from '@/interfaces/room.interface';
import { CardInterface } from '@/interfaces/card.interface';

const initialState: {
  userRooms: UserRoomInterface[];
  room: RoomInterface | null;
  vote: VoteInterface | null;
} = {
  userRooms: [],
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
    addRoomReducer: (state, action) => {
      const data: { userRoom: UserRoomInterface } = action.payload;

      state.userRooms.push(data.userRoom);
    },
    setRoomReducer: (state, action) => {
      const data: { room: RoomInterface } = action.payload;

      state.room = data.room;
      state.vote = null;
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

    deleteRoomReducer: (state, action) => {
      const data: { roomId: number } = action.payload;

      state.userRooms = state.userRooms.filter(
        (item) => item.room.id !== data.roomId,
      );
    },
  },
});

export const {
  setUserRoomsReducer,
  addRoomReducer,
  setRoomReducer,
  setVoteReducer,
  updateVoteReducer,
  updateCardReducer,
  deleteRoomReducer,
} = roomSlice.actions;

export default roomSlice.reducer;
