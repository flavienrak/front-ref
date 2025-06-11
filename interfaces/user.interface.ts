import { UserRoomInterface } from './user-room.interface';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  profile: string;
  isVerified: boolean;
  role: 'user' | 'admin';

  userRooms: UserRoomInterface[];

  createdAt: Date;
  updatedAt: Date;
}
