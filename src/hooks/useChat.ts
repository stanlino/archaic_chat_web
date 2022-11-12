import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { Message } from "../dtos/message";
import { useMessagesStore } from "../store/messages";
import { useUserStore } from "../store/user";

export const useChat = (socket: Socket | undefined, room_id: string) => {

  const [messages, addMessage, clearMessages] = useMessagesStore(state => [state.messages, state.addMessage, state.clearMessages]);
  const [username, color] = useUserStore(state => [state.username, state.color]);

  useEffect(() => {
    socket?.on('message-to-app', (newMessage) => {
      addMessage(newMessage);
    });

    socket?.on('user-connected', (username) => {
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        message: `${username} entrou na festa!`,
        time: new Date().toISOString(),
        type: 'system'
      });
    })

    socket?.on('user-left', (username) => {
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        message: `${username} foi de beise!`,
        time: new Date().toISOString(),
        type: 'system'
      });
    })

    return () => {
      clearMessages()
    }
  }, [socket])

  function sendMessage(message: string, highlighted_message: Message | null) {

    const id = Math.random().toString(36).substr(2, 9)
    const time = new Date().toLocaleTimeString()
    const type = 'user'
    const socket_id = socket?.id

    const newMessage: Message = {
      message,
      username,
      room_id,
      id,
      color,
      highlighted_message,
      time,
      type,
      socket_id,
    }

    socket?.emit('message-to-server', newMessage);

    addMessage(newMessage);
  }

  return {
    messages,
    sendMessage
  }
}