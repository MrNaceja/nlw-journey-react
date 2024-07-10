
import { MapPin, Calendar as CalendarIcon, ArrowRight, UserRoundPlus, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { ModalInviteGuests } from './modal-invite-guests';
import { ModalConfirmTrip } from './modal-confirm-trip';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from 'react-day-picker';
import { format } from "date-fns"
import { api } from '../../lib/api';
import { TOwnerTrip } from '../../types';

export function PageCreateTrip() {
    const navigator = useNavigate()

    const [emailsInvited, setEmailsInvited] = useState<string[]>([])
    const [destination, setDestination] = useState('');
    const [period, setPeriod] = useState<DateRange | undefined>()
    const [isConfirmedDestinationAndPeriod, setIsConfirmedDestinationAndPeriodDefined] = useState(false)

    const hasDestinationAndPeriod = destination.length > 0 && (!!period?.from && !!period?.to)

    const confirmDestinationAndPeriod = () => setIsConfirmedDestinationAndPeriodDefined(true);
    const changeDestinationAndPeriod = () => setIsConfirmedDestinationAndPeriodDefined(false);

    const [modalInviteGuestsIsOpen, setModalInviteGuestsIsOpen] = useState(false)
    const [modalConfirmTripIsOpen, setModalConfirmTripIsOpen] = useState(false)

    const openModalInviteGuests = () => setModalInviteGuestsIsOpen(true)
    const openModalConfirmTrip = () => setModalConfirmTripIsOpen(true)
    const closeModalInviteGuests = () => setModalInviteGuestsIsOpen(false)
    const closeModalConfirmTrip = () => setModalConfirmTripIsOpen(false)

    const createTrip = async (owner: TOwnerTrip) => {
        if (!hasDestinationAndPeriod) return
        if (emailsInvited.length == 0) return

        const trip = {
            destination,
            starts_at: period.from,
            ends_at: period.to,
            emails_to_invite: emailsInvited,
            owner_name: owner.name,
            owner_email: owner.email
        }
        try {
            const res = await api.post('/trips', trip)
            const { tripId } = res.data
            navigator(`/trips/${tripId}`);
        }
        catch (error) {
            console.error('erro', error)
        }
    }

    const addEmailInvited = (emailToInvite: string) => setEmailsInvited([...emailsInvited, emailToInvite])
    const removeEmailInvited = (emailToRemove: string) => setEmailsInvited([...emailsInvited.filter(email => email !== emailToRemove)]);

    const formattedPeriod = (period?.from && period?.to) ? format(period.from, "d ' de ' LLL ' até " + format(period.to, "d ' de ' LLL") + "'") : null


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
                        <div className='flex items-center justify-between flex-1'>
                            <div className='flex items-center gap-2 flex-1'>
                                <MapPin className='size-5 text-zinc-400' />
                                <input disabled={isConfirmedDestinationAndPeriod}
                                    type="text"
                                    placeholder="Para onde você vai?"
                                    className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                                    onChange={e => setDestination(e.currentTarget.value)}
                                />
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className='flex items-center gap-2 text-md text-zinc-400 text-left'>
                                        <CalendarIcon className='size-5 text-zinc-400' />
                                        <span> {formattedPeriod ?? 'Quando?'}</span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" side="left">
                                    <Calendar
                                        mode="range"
                                        selected={period}
                                        onSelect={setPeriod}
                                        initialFocus
                                        defaultMonth={period?.from}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <hr className='w-px h-6 bg-zinc-800' />

                        {
                            !isConfirmedDestinationAndPeriod
                                ? (
                                    <Button onClick={confirmDestinationAndPeriod} disabled={!hasDestinationAndPeriod}>
                                        Continuar
                                        <ArrowRight className='size-5' />
                                    </Button>
                                )
                                : (
                                    <Button variant='secondary' onClick={changeDestinationAndPeriod}>
                                        Alterar local/data
                                        <Settings2 className='size-5' />
                                    </Button>
                                )
                        }
                    </div>
                    {
                        isConfirmedDestinationAndPeriod && (
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
                tripDestination={destination}
                tripPeriod={formattedPeriod ?? ''}
            />
        </section>
    )
}