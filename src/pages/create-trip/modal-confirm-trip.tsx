import { Loader, Mail, User, X } from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Button } from "../../components/button"
import { TOwnerTrip } from "../../types"

interface IModalConfirmTrip {
    isOpen: boolean,
    tripDestination: string,
    tripPeriod: string,
    closeModal: () => void,
    onConfirmTrip: (owner: TOwnerTrip) => Promise<void>
}
export function ModalConfirmTrip({ isOpen, onConfirmTrip, closeModal, tripDestination, tripPeriod }: IModalConfirmTrip) {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const _openModal = () => modalRef.current?.showModal()
    const _closeModal = () => modalRef.current?.close()

    const handleSubmitConfirmTrip = (event: FormEvent<HTMLFormElement>) => {
        setIsCreating(true)
        event.preventDefault()
        const data = new FormData(event.currentTarget);

        const owner = {
            name: data.get('name')?.toString() as string,
            email: data.get('email')?.toString() as string
        }

        if (!owner.name || !owner.email) return;
        onConfirmTrip(owner).then(() => setIsCreating(false));
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
                        <button onClick={closeModal} disabled={isCreating}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='text-white font-bold'>{tripDestination}</span> nas datas de <span className='text-white font-bold'>{tripPeriod}</span> preencha seus dados abaixo:</p>
                </header>

                <form className='flex flex-col space-y-3 items-center' onSubmit={handleSubmitConfirmTrip}>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg w-full gap-2.5 items-center'>
                        <User className='size-5 text-zinc-400' />
                        <input disabled={isCreating} type="text" name="name" placeholder="Seu lindo nome" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg w-full gap-2.5 items-center'>
                        <Mail className='size-5 text-zinc-400' />
                        <input disabled={isCreating} type="email" name="email" placeholder="Seu email pessoal" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <Button type="submit" full disabled={isCreating}>
                        {
                            isCreating
                                ? (
                                    <>
                                        Confirmando viagem
                                        <Loader className="size-5 animate-spin" />
                                    </>
                                )
                                : 'Confirmar criação da viagem'
                        }
                    </Button>
                </form>
            </main>
        </dialog>
    )
}