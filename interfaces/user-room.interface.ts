import { RoomInterface } from './room.interface';
import { UserInterface } from './user.interface';

export interface UserRoomInterface {
  id: number;
  role: 'user' | 'admin';

  roomId: number;
  userId: number;

  room: RoomInterface;
  user: UserInterface;
}
