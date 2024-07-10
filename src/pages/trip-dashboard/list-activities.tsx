import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TActivityDay } from "../../types";
import { AxiosError } from "axios";
import { api } from "../../lib/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ListActivities() {
    const { tripId } = useParams()
    const [activitiesDay, setActivitiesDay] = useState<TActivityDay[]>([])

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/trips/${tripId}/activities`)
                setActivitiesDay(res.data.activities.map(data => ({
                    date: new Date(data.date),
                    activities: data.activities.map(dataActivity => ({
                        id: dataActivity.id,
                        title: dataActivity.title,
                        occursAt: new Date(dataActivity.occurs_at)
                    }))
                })))
            }
            catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message)
                }
                console.log(error)
            }
        })()
    }, [tripId])
    return (
        <ul className="flex flex-col gap-8">
            {
                activitiesDay.map(day => (
                    <li className="flex flex-col gap-3">
                        <div className="flex items-baseline gap-1">
                            <h4 className="text-zinc-300 text-xl font-semibold">{format(day.date, "'Dia' d")}</h4>
                            <span className="text-zinc-500 text-xs">{format(day.date, 'EEEE', { locale: ptBR })}</span>
                        </div>
                        {
                            day.activities.length == 0
                                ? <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                                : (
                                    <ul className="gap-3 flex flex-col">
                                        {
                                            day.activities.map(activity => (
                                                <li key={activity.id} className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-700 p-2.5">
                                                    <div className="flex items-center gap-3">
                                                        <CircleCheck className="size-5 text-lime-500" />
                                                        <span className="text-zinc-100">{activity.title}</span>
                                                    </div>
                                                    <span className="text-zinc-400 text-sm">{format(activity.occursAt, "HH':'mm'h'")}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                        }
                    </li>
                ))
            }
        </ul>
    )
}