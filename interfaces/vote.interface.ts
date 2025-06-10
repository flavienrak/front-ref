import { CardInterface } from './card.interface';
import { RoomInterface } from './room.interface';

export interface VoteInterface {
  id: number;
  content: string;
  min: number;
  max: number;
  mid: number;

  roomId: number;

  createdAt: Date;
  updatedAt: Date;

  cards: CardInterface[];
  room: RoomInterface;
}
