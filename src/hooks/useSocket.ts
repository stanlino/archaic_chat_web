import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../dtos/message";

interface UseSocketOptions {
  username: string;
  room_id: string;
  color: string;
}

export const useSocket = (serverURL: string, {
  username,
  room_id,
  color
}: UseSocketOptions) => {

  const [messages, setMessages] = useState<Message[]>([] as Message[]);

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

  function sendMessage(message: string, highlight_id: string | null) {

    console.log(message)

    if (!message) return

    const id = Math.random().toString(36).substr(2, 9)

    const newMessage: Message = {
      message,
      username,
      room_id,
      id,
      time: new Date().toLocaleTimeString(),
      color,
      highlight_id,
    }

    socket.current?.emit('message-to-server', newMessage);
  }

  return { messages, sendMessage, connected }
}	