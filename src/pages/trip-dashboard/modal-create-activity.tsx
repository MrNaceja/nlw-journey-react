import { CalendarClock, Tag, X } from "lucide-react"
import { useEffect, useRef } from "react"
import { Button } from "../../components/button"

interface IModalCreateActivity {
    isOpen: boolean,
    closeModal: () => void,
}
export function ModalCreateActivity({ isOpen, closeModal }: IModalCreateActivity) {
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const _openModal = () => modalRef.current?.showModal()
    const _closeModal = () => modalRef.current?.close()

    useEffect(() => {
        isOpen ? _openModal() : _closeModal()
    }, [isOpen])
    return (
        <dialog ref={modalRef} className="backdrop:bg-black/60 backdrop:backdrop-blur-sm rounded-xl w-[540px] bg-zinc-900" onClick={e => (e.target == modalRef.current && closeModal())}>
            <main className='flex-col items-center space-y-5 p-6'>
                <header className='gap-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg text-white font-medium'>Cadastrar atividade</h1>
                        <button onClick={closeModal}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>Todos convidados podem visualizar as atividades.</p>
                </header>

                <form className='flex flex-col space-y-3 items-center'>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg w-full gap-2.5 items-center'>
                        <Tag className='size-5 text-zinc-400' />
                        <input type="text" name="activity-name" placeholder="Qual a atividade" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg gap-2.5 items-center w-full'>
                        <CalendarClock className='size-5 text-zinc-400' />
                        <input type="datetime-local" name="activity-occurs-at" placeholder="Data e Horário da atividade" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <Button type="submit" full>
                        Salvar atividade
                    </Button>
                </form>
            </main>
        </dialog>
    )
}