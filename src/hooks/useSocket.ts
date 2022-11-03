import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  username: string;
  room_id: string;
}

export const useSocket = (serverURL: string, {
  username,
  room_id
}: UseSocketOptions) => {

  const [messages, setMessages] = useState([] as any[]);

  const [connected, setConnected] = useState(false);

  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(serverURL, { transports: ['websocket'] });

    socket.current?.on('connect', () => {
      socket.current?.emit('join-room', room_id);

      setConnected(true)
    })

    socket.current?.on('message-to-app', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });
  }, []);

  function sendMessage(message: string) {
    if (!message) return

    const message_id = Math.random().toString(36).substr(2, 9)

    socket.current?.emit('message-to-server', {
      message,
      username,
      room_id,
      message_id
    })
  }

  return { messages, sendMessage, connected }
}	