import { Mail, User, X } from "lucide-react"
import { FormEvent, useEffect, useRef } from "react"
import { TCreatorTrip } from "."
import { Button } from "../../components/button"

interface IModalConfirmTrip {
    isOpen: boolean,
    closeModal: () => void,
    onConfirmTrip: (creator: TCreatorTrip) => void
}
export function ModalConfirmTrip({ isOpen, onConfirmTrip, closeModal }: IModalConfirmTrip) {
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const _openModal = () => modalRef.current?.showModal()
    const _closeModal = () => modalRef.current?.close()

    const handleSubmitConfirmTrip = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);

        const tripCreator = {
            name: data.get('name')?.toString() as string,
            email: data.get('email')?.toString() as string
        }
        onConfirmTrip(tripCreator);
    }

    useEffect(() => {
        isOpen ? _openModal() : _closeModal()
    }, [isOpen])
    return (
        <dialog ref={modalRef} className="backdrop:bg-black/60 backdrop:backdrop-blur-sm rounded-xl w-[540px] bg-zinc-900" onClick={e => (e.target == modalRef.current && closeModal())}>
            <main className='flex-col items-center space-y-5 p-6'>
                <header className='gap-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg text-white font-medium'>Confirmar criação da viagem</h1>
                        <button onClick={closeModal}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>
                        Para concluir a criação da viagem para <span className='text-white font-bold'>Florianópolis, Brasil</span> nas datas de <span className='text-white font-bold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
                    </p>
                </header>

                <form className='flex flex-col space-y-3 items-center' onSubmit={handleSubmitConfirmTrip}>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg w-full gap-2.5 items-center'>
                        <User className='size-5 text-zinc-400' />
                        <input type="text" name="name" placeholder="Seu lindo nome" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg w-full gap-2.5 items-center'>
                        <Mail className='size-5 text-zinc-400' />
                        <input type="email" name="email" placeholder="Seu email pessoal" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <Button type="submit" full>
                        Confirmar criação da viagem
                    </Button>
                </form>
            </main>
        </dialog>
    )
}