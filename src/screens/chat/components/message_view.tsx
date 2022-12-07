import { useState } from "react";
import { MdContentCopy, MdOutlineReply, MdCheck } from 'react-icons/md'

import { Message } from "../../../dtos/message";
import { useMessagesStore } from "../../../store/messages";

interface MessageViewProps {
  message: Message;
  replyMessage: (message: Message) => void;
}

export function MessageView({ message, replyMessage }: MessageViewProps) {

  const [ messages ] = useMessagesStore(store => [store.messages])
  const [ isCopied, setIsCopied ] = useState(false)

  const isHighlighted = messages.find(item => item.id === message.reply?.id)

  function cancelDoubleClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  function copy() {
    navigator.clipboard.writeText(message.message)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  function reply() {
    replyMessage(message)
  }

  if (message.type === 'system') {
    return (
      <div className="text-neutral-500 text-sm my-2">
        {message.message} às {message.time}
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
      <button onDoubleClick={cancelDoubleClick} onClick={copy} className={`text-neutral-400 hover:text-neutral-100 p-2 rounded border border-transparent hover:border-gray-400 text-sm font-bold hidden group-hover:block ${isCopied && 'border-green-500 text-green-500 hover:border-green-500 hover:text-green-500'}`}>
        {
          isCopied ? <MdCheck /> : <MdContentCopy />
        }
      </button>
      <span className="text-neutral-500 text-sm ml-4">{message.time}</span>
    </div>
  )
} 