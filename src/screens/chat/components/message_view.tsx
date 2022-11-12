import { DetailedHTMLProps } from "react";
import { Message } from "../../../dtos/message";
import { useMessagesStore } from "../../../store/messages";

interface MessageViewProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  message: Message;
}

export function MessageView({ message, ...rest }: MessageViewProps) {

  const [ messages ] = useMessagesStore(store => [store.messages])

  const isHighlighted = messages.find(item => item.id === message.highlighted_message?.id)

  if (message.type === 'system') {
    return (
      <div className="text-neutral-500 text-sm my-2">
        {message.message}
      </div>
    )
  }

  return (
    <div {...rest} className="flex items-center justify-between p-2 hover:bg-neutral-800 rounded-lg cursor-pointer select-none">
      <div className="flex items-center">
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
      <span className="text-neutral-500 text-sm ml-4">{message.time}</span>
    </div>
  )
} 