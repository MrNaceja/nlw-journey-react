import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { useParams } from "react-router-dom";
import { TParticipant } from "../../types";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function ListParticipants() {
    const { tripId } = useParams()
    const [participants, setParticipants] = useState<TParticipant[]>([])

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/trips/${tripId}/participants`)
                const participantsData = res.data.participants
                setParticipants(participantsData.map(data => ({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    confirmed: data.is_confirmed
                })))
            }
            catch (error) {
                console.error(error);
            }
        })()
    }, [tripId])
    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-xl">Participantes</h3>
            <ul className="flex flex-col gap-5">
                {
                    participants.map((participant, pos) => (
                        <li key={participant.id} className="flex justify-between items-center">
                            <div className="flex flex-col gap-1.5">
                                <h5 className="text-zinc-100">{participant.name ? participant.name : `Participante nº${pos}`}</h5>
                                <span className="text-zinc-400 text-sm">{participant.email}</span>
                            </div>
                            {
                                participant.confirmed
                                    ? <CircleCheck className="size-5 text-lime-500" />
                                    : <CircleDashed className="size-5 text-zinc-400" />
                            }

                        </li>
                    ))
                }
            </ul>
            <button className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 flex items-center justify-center gap-2 hover:bg-zinc-700'>
                <UserCog className='size-5' />
                Gerenciar convidados
            </button>
        </div>
    )
}