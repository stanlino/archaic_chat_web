import { FormEvent, useRef } from "react"

function ChatScreen() {

  const new_message_input_ref = useRef<HTMLInputElement>(null)

  function handleSendANewMessage(event: FormEvent) {
    event.preventDefault()

    if (!new_message_input_ref.current) return

    if (!new_message_input_ref.current.value) return

    console.log(new_message_input_ref.current.value)

    new_message_input_ref.current.value = ''
  }

  return (
    <main className="h-screen w-screen bg-neutral-900 flex flex-col justify-center items-center p-4 md:p-16">
      <div className="flex-1">

      </div>
      <form onSubmit={handleSendANewMessage} className='flex w-full gap-2'>
        <input ref={new_message_input_ref} placeholder="Escreva uma mensagem" className="w-full bg-neutral-800 h-10 rounded placeholder-gray-400 text-slate-100 px-4" />
        <button type="submit" className="w-1/6 bg-neutral-600 h-10 rounded text-slate-100 px-4 hover:bg-neutral-500 font-bold">Enviar</button>
      </form>
    </main>
  )
}

export { ChatScreen }