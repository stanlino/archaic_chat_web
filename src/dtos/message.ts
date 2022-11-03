export interface Message {
  id: string;
  message: string;
  username: string;
  color: string;
  highlight_id: string | null;
  time: string;
  room_id: string;
};