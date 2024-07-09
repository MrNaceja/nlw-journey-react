import { AtSign, Plus, X } from "lucide-react"
import { FormEvent, useEffect, useRef } from "react"
import { Button } from "../../components/button"

interface IModalInviteGuests {
    isOpen: boolean,
    closeModal: () => void,
    emailsToInvite: string[],
    addEmailInvited: (emailToInvite: string) => void,
    removeEmailInvited: (emailToRemove: string) => void
}
export function ModalInviteGuests({ isOpen, emailsToInvite, addEmailInvited, removeEmailInvited, closeModal }: IModalInviteGuests) {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const _openModal = () => modalRef.current?.showModal()
    const _closeModal = () => modalRef.current?.close()

    const handleSubmitEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget;
        const data = new FormData(form);
        const invitedEmail = data.get('guest-email')?.toString();
        if (!invitedEmail) return;
        if (emailsToInvite.includes(invitedEmail)) {
            form.getElementsByTagName('input')[0].setCustomValidity('Este email já foi convidado.')
            return;
        }
        addEmailInvited(invitedEmail)

        form.reset();
    }

    useEffect(() => {
        isOpen ? _openModal() : _closeModal()
    }, [isOpen])
    return (
        <dialog ref={modalRef} className="backdrop:bg-black/60 backdrop:backdrop-blur-sm rounded-xl w-[640px] bg-zinc-900" onClick={e => (e.target == modalRef.current && closeModal())}>
            <main className='flex-col items-center space-y-5 p-6'>
                <header className='gap-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg text-white font-medium'>Selecionar convidados</h1>
                        <button onClick={closeModal}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
                </header>
                <aside className='flex flex-wrap gap-2'>
                    {
                        emailsToInvite.map(email => (
                            <span key={email} className='bg-zinc-800 rounded-md flex justify-between py-1.5 px-2.5 text-zinc-300 items-center gap-2 font-light'>
                                {email}
                                <X className='size-4 cursor-pointer' onClick={() => removeEmailInvited(email)} />
                            </span>
                        ))
                    }
                </aside>
                <hr className='w-full h-px bg-zinc-800' />
                <form onSubmit={handleSubmitEmailToInvite} className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg'>
                    <div className='flex items-center gap-2'>
                        <AtSign className='size-5 text-zinc-400' />
                        <input type="email" name="guest-email" placeholder="Digite o email do convidado" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <Button type="submit">
                        Convidar
                        <Plus className='size-5' />
                    </Button>
                </form>
            </main>
        </dialog>

    )
}