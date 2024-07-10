import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TTrip } from "../../types";
import { api } from "../../lib/api";
import { format } from "date-fns";

export function Header() {
    const { tripId } = useParams()
    const [trip, setTrip] = useState<TTrip | undefined>()

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/trips/${tripId}`)
                const tripData = res.data.trip
                setTrip({
                    destination: tripData.destination,
                    period: {
                        from: new Date(tripData.starts_at),
                        to: new Date(tripData.ends_at),
                    },
                    confirmed: tripData.isConfirmed
                })
            }
            catch (error) {
                console.error(error);
            }
        })()
    }, [tripId])
    return (
        <header className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-700 px-5 py-3">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-200 flex-1">{trip?.destination}</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-200 flex-1">
                        {
                            trip && format(trip.period.from, "d ' de ' LLL ' até " + format(trip.period.to, "d ' de ' LLL") + "'")
                        }
                    </span>
                </div>
                <hr className='w-px h-6 bg-zinc-800' />
                <Button variant="secondary">
                    Alterar local/data
                    <Settings2 className='size-5' />
                </Button>
            </div>
        </header>
    )
}