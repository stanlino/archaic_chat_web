import { MdCancelPresentation } from 'react-icons/md'

import { Message } from "../../../dtos/message";

interface HighlightedMessageProps {
  message: Message
  dismiss: (message: Message) => void
}

export function HighlightedMessage({ message, dismiss }: HighlightedMessageProps) {
  return (
    <div className="mb-2 items-center flex">
      <button 
        type='button' 
        onClick={() => dismiss(message)} 
        className="text-red-500 items-center justify-center text-xl hover:text-red-900" 
      >
        <MdCancelPresentation />
      </button>
      <span className="text-gray-500 mx-1">Mensagem destacada:</span>
      <span className="text-gray-300">
        {message.message}
      </span>
    </div>
  )
}