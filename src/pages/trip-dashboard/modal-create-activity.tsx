import { CalendarClock, Loader, Tag, X } from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Button } from "../../components/button"
import { api } from "../../lib/api"
import { useNavigate, useParams } from "react-router-dom"
import { AxiosError } from "axios"

interface IModalCreateActivity {
    isOpen: boolean,
    closeModal: () => void,
}
export function ModalCreateActivity({ isOpen, closeModal }: IModalCreateActivity) {
    const { tripId } = useParams()
    const navigator = useNavigate()
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const _openModal = () => modalRef.current?.showModal()
    const _closeModal = () => modalRef.current?.close()

    const handleSubmitCreateActivity = async (event: FormEvent<HTMLFormElement>) => {
        setIsCreating(true)
        event.preventDefault()
        const form = event.currentTarget;

        const data = new FormData(form)
        const activity = {
            title: data.get('activity-name')?.toString(),
            occurs_at: data.get('activity-occurs-at')?.toString(),
        }

        try {
            await api.post(`/trips/${tripId}/activities`, activity)
        }
        catch (error) {
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message ?? 'Erro interno.')
            }
            console.log(error)
        }
        finally {
            setIsCreating(false)
            closeModal()
            form.reset()
            navigator(0, { preventScrollReset: true })
        }
    }

    useEffect(() => {
        isOpen ? _openModal() : _closeModal()
    }, [isOpen])
    return (
        <dialog ref={modalRef} className="backdrop:bg-black/60 backdrop:backdrop-blur-sm rounded-xl w-[540px] bg-zinc-900" onClick={e => (e.target == modalRef.current && closeModal())}>
            <main className='flex-col items-center space-y-5 p-6'>
                <header className='gap-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg text-white font-medium'>Cadastrar atividade</h1>
                        <button onClick={closeModal} disabled={isCreating}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>Todos convidados podem visualizar as atividades.</p>
                </header>

                <form className='flex flex-col space-y-3 items-center' onSubmit={handleSubmitCreateActivity}>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg w-full gap-2.5 items-center'>
                        <Tag className='size-5 text-zinc-400' />
                        <input disabled={isCreating} type="text" name="activity-name" placeholder="Qual a atividade" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <div className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg gap-2.5 items-center w-full'>
                        <CalendarClock className='size-5 text-zinc-400' />
                        <input disabled={isCreating} type="datetime-local" name="activity-occurs-at" placeholder="Data e Horário da atividade" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
                    </div>
                    <Button type="submit" full disabled={isCreating}>
                        {
                            isCreating
                                ? (
                                    <>
                                        Criando atividade
                                        <Loader className="size-5 animate-spin" />
                                    </>
                                )
                                : 'Salvar atividade'
                        }
                    </Button>
                </form>
            </main>
        </dialog>
    )
}