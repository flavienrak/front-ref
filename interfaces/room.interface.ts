import { UserRoomInterface } from './user-room.interface';
import { VoteInterface } from './vote.interface';

export interface RoomInterface {
  id: number;
  name: string;

  userId: number;

  createdAt: Date;
  updatedAt: Date;

  userRooms: UserRoomInterface[];
  votes: VoteInterface[];
}
