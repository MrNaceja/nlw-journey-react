
import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { ModalInviteGuests } from './modal-invite-guests';
import { ModalConfirmTrip } from './modal-confirm-trip';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';

export type TCreatorTrip = {
    name: string,
    email: string
}
export function PageCreateTrip() {
    const navigator = useNavigate()

    const [hasLocationDefined, setHasLocationDefined] = useState(false)
    const [emailsInvited, setEmailsInvited] = useState<string[]>([])

    const [modalInviteGuestsIsOpen, setModalInviteGuestsIsOpen] = useState(false)
    const [modalConfirmTripIsOpen, setModalConfirmTripIsOpen] = useState(false)

    const openModalInviteGuests = () => setModalInviteGuestsIsOpen(true)
    const openModalConfirmTrip = () => setModalConfirmTripIsOpen(true)
    const closeModalInviteGuests = () => setModalInviteGuestsIsOpen(false)
    const closeModalConfirmTrip = () => setModalConfirmTripIsOpen(false)

    const confirmLocation = () => setHasLocationDefined(true)
    const changeLocation = () => setHasLocationDefined(false)

    const createTrip = (creator: TCreatorTrip) => {
        //criar a viagem...
        navigator('/trips/1')
    }

    const addEmailInvited = (emailToInvite: string) => setEmailsInvited([...emailsInvited, emailToInvite])
    const removeEmailInvited = (emailToRemove: string) => setEmailsInvited([...emailsInvited.filter(email => email !== emailToRemove)]);

    return (
        <section className="h-screen w-screen grid place-items-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl text-center px-6 space-y-10">
                <div className='flex flex-col items-center'>
                    <figure>
                        <img src="logo.svg" alt="Logo Plann.er" />
                    </figure>
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>
                <main className='flex flex-col space-y-4 items-center'>
                    <div className="w-full px-4 h-16 rounded-xl bg-zinc-900 flex items-center gap-5">
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <MapPin className='size-5 text-zinc-400' />
                                <input disabled={hasLocationDefined} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                            </div>

                            <div className='flex items-center gap-2'>
                                <Calendar className='size-5 text-zinc-400' />
                                <input disabled={hasLocationDefined} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 outline-none w-[100px]" />
                            </div>
                        </div>

                        <hr className='w-px h-6 bg-zinc-800' />

                        {
                            !hasLocationDefined
                                ? (
                                    <Button onClick={confirmLocation}>
                                        Continuar
                                        <ArrowRight className='size-5' />
                                    </Button>
                                )
                                : (
                                    <Button variant='secondary' onClick={changeLocation}>
                                        Alterar local/data
                                        <Settings2 className='size-5' />
                                    </Button>
                                )
                        }
                    </div>
                    {
                        hasLocationDefined && (
                            <div className="w-full px-4 h-16 rounded-xl bg-zinc-900 flex items-center gap-5">
                                <button className='flex items-center gap-2 flex-1 text-left' type='button' onClick={openModalInviteGuests}>
                                    <UserRoundPlus className='size-5 text-zinc-400' />
                                    {
                                        emailsInvited.length > 0
                                            ? <span className='text-lg text-zinc-200'>{emailsInvited.length} pessoa(s) convidada(s)</span>
                                            : <span className='text-lg text-zinc-400'>Quem estará na viagem?</span>
                                    }
                                </button>

                                <span className='w-px h-6 bg-zinc-800' />

                                <Button onClick={openModalConfirmTrip}>
                                    Confirmar viagem
                                    <ArrowRight className='size-5' />
                                </Button>
                            </div>
                        )
                    }
                </main>
                <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
            </div>

            <ModalInviteGuests
                emailsToInvite={emailsInvited}
                isOpen={modalInviteGuestsIsOpen}
                closeModal={closeModalInviteGuests}
                addEmailInvited={addEmailInvited}
                removeEmailInvited={removeEmailInvited}
            />
            <ModalConfirmTrip
                isOpen={modalConfirmTripIsOpen}
                closeModal={closeModalConfirmTrip}
                onConfirmTrip={createTrip}
            />
        </section>
    )
}