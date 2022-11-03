import { FormEvent, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";
import { useUserStore } from "../../store/chat";
import { MessageBox } from "./components/message_box";

function ChatScreen() {

  const [ username, color ] = useUserStore(state => [state.username, state.color]);

  const { room_id } = useParams()
 
  const new_message_input_ref = useRef<HTMLInputElement>(null)

  const [messageHighlightId, setMessageHighlightId] = useState<string | null>(null)

  const { connected, messages, sendMessage } = useSocket('https://uniquechatserver.herokuapp.com/', {
    username,
    room_id: String(room_id),
    color
  })

  function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    const message = new_message_input_ref.current?.value
    if (!message) return
    if (message.trim() === '') {
      new_message_input_ref.current!.value = ''
      return
    }

    sendMessage(message, messageHighlightId)
    new_message_input_ref.current.value = ''
    setMessageHighlightId(null)
  }

  function handleHighlightMessage(message_id: string) {
    setMessageHighlightId(message_id)
  }

  const reversed_messages = messages.slice().reverse()

  return (
    <main className="h-screen w-screen bg-neutral-900 flex flex-col justify-center px-12 pb-8 pt-4">
      <h2 className="text-left text-white text-bold text-lg">{`> ${room_id}`}</h2>
      <div className="flex-1 w-full overflow-hidden py-4">
        <div className="flex-1 flex flex-col-reverse overflow-y-auto h-full pr-4">
          { reversed_messages.map((message) => 
            <MessageBox 
              key={message.id} 
              message={message} 
              messages={messages} 
              onDoubleClick={() => handleHighlightMessage(message.id)}
            />
          )}
          <span className="text-gray-500 my-4">
            {connected ? 'Conectado!': 'Estabelecendo conexão ...'}
          </span>
        </div>
      </div>
      <form onSubmit={handleSendMessage} className='flex w-full flex-col'>
        {messageHighlightId && (
          <div className="my-2">
            <button type='button' onClick={() => setMessageHighlightId(null)} className="text-red-400 mr-2 hover:underline">Cancelar</button>
            <span className="text-gray-500">Mensagem destacada: </span>
            <span className="text-gray-300">
              {messages.find(message => message.id === messageHighlightId)?.message}
            </span>
          </div>
        )}
        <div className="flex w-full gap-2">
          <input disabled={!connected} ref={new_message_input_ref} placeholder="Escreva uma mensagem" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4 text-base" />
          <button type="submit" className="min-w-1/6 bg-neutral-600 h-10 rounded text-slate-100 hover:bg-neutral-500 font-bold text-center px-4">Enviar</button>
        </div>
      </form>
    </main>
  )
}

export { ChatScreen }