export interface Message {
  id: string;
  message: string;
  username?: string;
  color?: string;
  highlighted_message?: Message | null;
  time?: string;
  room_id?: string;
  type: 'user' | 'system';
  socket_id?: string;
};