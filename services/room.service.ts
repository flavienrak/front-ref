import api from '@/axios/axios.instance';

const createRoomService = async (name: string) => {
  try {
    const res = await api.post('/room', { name });
    return res.data;
  } catch (error) {
    return { error: `CREATE ROOM ERROR: ${error}` };
  }
};

const getUserRoomsService = async () => {
  try {
    const res = await api.get('/room');
    return res.data;
  } catch (error) {
    return { error: `GET USER ROOMS ERROR: ${error}` };
  }
};

const getRoomService = async (id: number) => {
  try {
    const res = await api.get(`/room/${id}`);
    return res.data;
  } catch (error) {
    return { error: `GET ROOM ERROR: ${error}` };
  }
};

const getVoteService = async (data: { roomId: number; voteId: number }) => {
  try {
    const res = await api.get(`/room/${data.roomId}/vote/${data.voteId}`);
    return res.data;
  } catch (error) {
    return { error: `GET VOTE ERROR: ${error}` };
  }
};

const createVoteService = async (data: {
  id: number;
  content: string;
  max: number;
  min: number;
  mid: number;
}) => {
  try {
    const res = await api.post(`/room/${data.id}`, {
      content: data.content,
      max: data.max,
      min: data.min,
      mid: data.mid,
    });
    return res.data;
  } catch (error) {
    return { error: `CREATE VOTE ERROR: ${error}` };
  }
};

const updateVoteService = async (data: {
  id: number;
  content: string;
  max: number;
  min: number;
  mid: number;
}) => {
  try {
    const res = await api.put(`/room/${data.id}`, {
      content: data.content,
      max: data.max,
      min: data.min,
      mid: data.mid,
    });
    return res.data;
  } catch (error) {
    return { error: `UPDATE VOTE ERROR: ${error}` };
  }
};

const chooseCardService = async (data: {
  roomId: number;
  voteId: number;
  value: string | number;
}) => {
  try {
    const res = await api.post(
      `/room/${data.roomId}/vote/${data.voteId}/card`,
      { value: data.value },
    );
    return res.data;
  } catch (error) {
    return { error: `CHOOSE CARD ERROR: ${error}` };
  }
};

const deleteRoomService = async (id: number) => {
  try {
    const res = await api.delete(`/room/${id}`);
    return res.data;
  } catch (error) {
    return { error: `DELETE ROOM ERROR: ${error}` };
  }
};

export {
  createRoomService,
  getUserRoomsService,
  getRoomService,
  getVoteService,
  createVoteService,
  updateVoteService,
  chooseCardService,
  deleteRoomService,
};
