export function Loading() {
  return (
    <div className="flex w-full max-w-md flex-col justify-center items-center gap-4">
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500" />
        <p className="text-neutral-400">Buscando por salas...</p>
      </div>
    </div>
  )
}