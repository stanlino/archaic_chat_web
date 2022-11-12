import { Message } from "../../../dtos/message";

interface HighlightedMessageProps {
  message: Message
  dismiss: (message: Message) => void
}

export function HighlightedMessage({ message, dismiss }: HighlightedMessageProps) {
  return (
    <div className="my-2">
      <button type='button' onClick={() => dismiss(message)} className="text-red-400 mr-2 hover:underline">
        Cancelar
      </button>
      <span className="text-gray-500">Mensagem destacada: </span>
      <span className="text-gray-300">
        {message.message}
      </span>
    </div>
  )
}