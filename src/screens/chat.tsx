import { FormEvent, useRef } from "react"
import { useParams } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useUserStore } from "../store/chat";

function ChatScreen() {

  const [ username, color ] = useUserStore(state => [state.username, state.color]);

  const { room_id } = useParams()
 
  const new_message_input_ref = useRef<HTMLInputElement>(null)

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

    sendMessage(message)
    new_message_input_ref.current.value = ''
  }

  const reversed_messages = messages.slice().reverse()

  return (
    <main className="h-screen w-screen bg-neutral-900 flex flex-col justify-center items-center p-4 md:p-16">
      <div className="flex-1 w-full overflow-hidden py-4">
        <div className="flex-1 flex flex-col-reverse overflow-y-auto h-full pr-4">
          {reversed_messages.map((message, index) => {
            return (
              <div key={index} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full mr-4" style={{ backgroundColor: message.color }} />
                  <div className="flex flex-1 flex-col">
                    <span className="text-neutral-100 font-bold">{message.username}</span>
                    <span className="text-neutral-400 text-sm">{message.message}</span>
                  </div>
                </div>
                <span className="text-neutral-400 text-sm ml-4">{message.time}</span>
              </div>
            )
          })}
          <span className="text-gray-500 my-4">{connected ? 'Conectado ao chat': 'Se conectando ao chat ...'}</span>
        </div>
      </div>
      <form onSubmit={handleSendMessage} className='flex w-full gap-2'>
        <input disabled={!connected} ref={new_message_input_ref} placeholder="Escreva uma mensagem" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4 text-base" />
        <button type="submit" className="min-w-1/6 bg-neutral-600 h-10 rounded text-slate-100 hover:bg-neutral-500 font-bold text-center px-4">Enviar</button>
      </form>
    </main>
  )
}

export { ChatScreen }