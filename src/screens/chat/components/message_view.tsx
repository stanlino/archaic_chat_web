import { DetailedHTMLProps } from "react";
import { MdContentCopy, MdOutlineReply } from 'react-icons/md'

import { Message } from "../../../dtos/message";
import { useMessagesStore } from "../../../store/messages";

interface MessageViewProps {
  message: Message;
  replyMessage: (message: Message) => void;
}

export function MessageView({ message, replyMessage }: MessageViewProps) {

  const [ messages ] = useMessagesStore(store => [store.messages])

  const isHighlighted = messages.find(item => item.id === message.highlighted_message?.id)

  function copy() {
    navigator.clipboard.writeText(message.message)
  }

  function reply() {
    replyMessage(message)
  }

  if (message.type === 'system') {
    return (
      <div className="text-neutral-500 text-sm my-2">
        {message.message}
      </div>
    )
  }

  return (
    <div onDoubleClick={reply} className="group flex items-center p-2 rounded-lg cursor-pointer select-none hover:bg-black hover:bg-opacity-10 border border-transparent hover:border-gray-600">
      <div className="flex flex-1 items-center">
        <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: message.color }} />
        <div className="flex flex-1 flex-col">
          {isHighlighted && (
            <span className="text-neutral-400 text-sm">
              {isHighlighted.username}: {isHighlighted.message}
            </span>
          )}
          <span className="text-neutral-100 font-bold">{message.username}</span>
          <span className="text-neutral-400 text-sm">{message.message}</span>
        </div>
      </div>
      <button onClick={reply} className="text-neutral-400 hover:text-neutral-100 p-2 rounded border border-transparent hover:border-gray-400 text-sm font-bold hidden group-hover:block">
        <MdOutlineReply />
      </button>
      <button onClick={copy} className="text-neutral-400 hover:text-neutral-100 p-2 rounded border border-transparent hover:border-gray-400 text-sm font-bold hidden group-hover:block">
        <MdContentCopy />
      </button>
      <span className="text-neutral-500 text-sm ml-4">{message.time}</span>
    </div>
  )
} 