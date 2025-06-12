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
    updateUserRoomReducer: (state, action) => {
      const data: { userRoom: UserRoomInterface } = action.payload;

      const userRoomIndex = state.userRooms.findIndex(
        (item) => item.id === data.userRoom.id,
      );

      if (userRoomIndex !== -1) {
        state.userRooms[userRoomIndex] = data.userRoom;
      }
    },
    addUserRoomReducer: (state, action) => {
      const data: { userRoom: UserRoomInterface } = action.payload;

      state.userRooms.push(data.userRoom);
    },
    addRoomReducer: (state, action) => {
      const data: { room: RoomInterface } = action.payload;

      const userRoomIndex = state.userRooms.findIndex(
        (item) => item.roomId === data.room.id,
      );

      if (userRoomIndex !== -1) {
        state.userRooms[userRoomIndex] = {
          ...state.userRooms[userRoomIndex],
          room: data.room,
        };

        if (state.room) {
          state.room = data.room;
        }
      }
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
    addVoteReducer: (state, action) => {
      const data: { vote: VoteInterface } = action.payload;

      if (state.room) {
        const voteIndex = state.room.votes.findIndex(
          (item) => item.id === data.vote.id,
        );

        if (voteIndex !== -1) {
          // REPLACE
          state.room = {
            ...state.room,
            votes: state.room.votes.map((item) =>
              item.id === data.vote.id ? data.vote : item,
            ),
          };
        } else {
          // ADD
          state.room = {
            ...state.room,
            votes: [...state.room.votes, data.vote],
          };
        }

        if (state.vote) {
          state.vote = data.vote;
        }
      }

      state.userRooms = state.userRooms.map((item) => {
        if (item.roomId === data.vote.roomId) {
          const existingVoteIndex = item.room.votes.findIndex(
            (v) => v.id === data.vote.id,
          );

          let updatedVotes;
          if (existingVoteIndex !== -1) {
            // REPLACE
            updatedVotes = item.room.votes.map((v) =>
              v.id === data.vote.id ? data.vote : v,
            );
          } else {
            // ADD
            updatedVotes = [...item.room.votes, data.vote];
          }

          return {
            ...item,
            room: {
              ...item.room,
              votes: updatedVotes,
            },
          };
        }
        return item;
      });
    },
    deleteVoteReducer: (state, action) => {
      const data: { vote: VoteInterface } = action.payload;

      if (state.room) {
        const voteIndex = state.room.votes.findIndex(
          (item) => item.id === data.vote.id,
        );

        if (voteIndex !== -1) {
          // DELETE
          state.room = {
            ...state.room,
            votes: state.room.votes.filter((item) => item.id !== data.vote.id),
          };
        }
      }

      state.userRooms = state.userRooms.map((item) => {
        if (item.roomId === data.vote.roomId) {
          const updatedVotes = item.room.votes.filter(
            (v) => v.id !== data.vote.id,
          );

          return {
            ...item,
            room: {
              ...item.room,
              votes: updatedVotes,
            },
          };
        }
        return item;
      });
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
      const data: { room: RoomInterface } = action.payload;

      const userRoomIndex = state.userRooms.findIndex(
        (item) => item.roomId === data.room.id,
      );

      if (userRoomIndex !== -1) {
        state.userRooms = state.userRooms.filter(
          (item) => item.roomId !== data.room.id,
        );
      }
    },
  },
});

export const {
  setUserRoomsReducer,

  addUserRoomReducer,
  setRoomReducer,
  addRoomReducer,

  setVoteReducer,
  addVoteReducer,
  updateVoteReducer,
  deleteVoteReducer,

  updateCardReducer,
  deleteRoomReducer,
} = roomSlice.actions;

export default roomSlice.reducer;
