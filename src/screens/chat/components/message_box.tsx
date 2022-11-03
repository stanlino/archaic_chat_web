import { DetailedHTMLProps } from "react";
import { Message } from "../../../dtos/message";

interface MessageBoxProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  messages: Message[];
  message: Message;
}

export function MessageBox({ message, messages, ...rest }: MessageBoxProps) {
  const highlight = message.highlight_id !== null ? 
    messages.find(item => item.id === message.highlight_id) :
    null

  return (
    <div {...rest} className="flex items-center justify-between p-2 hover:bg-neutral-800 rounded-lg cursor-pointer">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: message.color }} />
        <div className="flex flex-1 flex-col">
          {highlight && (
            <span className="text-neutral-400 text-sm">
              {highlight.username}: {highlight.message}
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