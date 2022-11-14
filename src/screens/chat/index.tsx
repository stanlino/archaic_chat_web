import { FormEvent, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { Message } from "../../dtos/message";
import { useChat } from "../../hooks/useChat";
import { useConnection } from "../../hooks/useConnection";
import { HighlightedMessage } from "./components/highlighted_message";
import { MessageView } from "./components/message_view";

function ChatScreen() {

  const { room_id } = useParams()
 
  const new_message_input_ref = useRef<HTMLInputElement>(null)

  const [ highlightedMessage, setHighlightedMessage ] = useState<Message | null>(null)

  const { connected, socket } = useConnection(String(room_id))
  const { messages, sendMessage, users } = useChat(socket, String(room_id))

  function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    const message = new_message_input_ref.current?.value
    if (!message) return
    if (message.trim() === '') return

    sendMessage(message, highlightedMessage)
    new_message_input_ref.current.value = ''
    setHighlightedMessage(null)
  }

  function handleHighlightMessage(message: Message) {
    setHighlightedMessage(message)
  }

  function handleDismissHighlightedMessage() {
    setHighlightedMessage(null)
  }

  const reversed_messages = messages.slice().reverse()

  return (
    <main className="h-screen w-screen bg-gradient-to-tr from-neutral-900 to-gray-900 flex flex-col justify-center px-12 pb-8 pt-4">
      <div className="flex">
        <div className="w-fit py-2 px-4">
          <span className="text-neutral-400 text-base">Sala:</span>
          <span className="text-neutral-100 text-lg font-bold ml-2">{room_id}</span>
        </div>
        <div className="w-fit items-center flex px-4">
          <span className="text-neutral-400 text-base">Status:</span>
          <span className={`text-base font-medium ml-2 ${connected ? `text-green-600` : `text-orange-400`}`}>
            {connected ? 'Conectado' : 'Estabelencendo conexão...'}
          </span>
        </div>
        <div className="flex-1" />
        <div className="w-fit items-center flex px-4">
          {users.length > 0 ? (
            <>
              <span className="text-neutral-100 text-lg font-bold mr-2">{users.length + 1}</span>
              <span className="text-neutral-400 text-base">Pessoas na sala</span>
            </>
          ): (
            <span className="text-neutral-400 text-base">Ninguém na sala {'(além de você)'}</span>
          )}
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden py-4">
        <div className="flex-1 flex flex-col-reverse overflow-y-auto h-full pr-4">
          {reversed_messages.map(message => 
            <MessageView 
              replyMessage={handleHighlightMessage}
              key={message.id} 
              message={message} 
            />
          )}
        </div>
      </div>
      <form onSubmit={handleSendMessage} className='flex w-full flex-col'>
        {highlightedMessage && <HighlightedMessage message={highlightedMessage} dismiss={handleDismissHighlightedMessage} />}
        <div className="flex w-full gap-2">
          <input disabled={!connected} ref={new_message_input_ref} placeholder="Escreva uma mensagem" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4 text-base" />
          <button type="submit" className="min-w-1/6 bg-neutral-600 h-10 rounded text-slate-100 hover:bg-neutral-500 font-bold text-center px-4">Enviar</button>
        </div>
      </form>
    </main>
  )
}

export { ChatScreen }