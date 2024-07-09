import { CircleCheck } from "lucide-react";

export function ListActivities() {
    return (
        <ul>
            <li className="flex flex-col gap-3">
                <div className="flex items-baseline gap-1">
                    <h4 className="text-zinc-300 text-xl font-semibold">Dia 17</h4>
                    <span className="text-zinc-500 text-xs">Sábado</span>
                </div>
                {
                    false
                        ? <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                        : (
                            <ul className="gap-3 flex flex-col">
                                <li className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-700 p-2.5">
                                    <div className="flex items-center gap-3">
                                        <CircleCheck className="size-5 text-lime-500" />
                                        <span className="text-zinc-100">Corrida de Kart</span>
                                    </div>
                                    <span className="text-zinc-400 text-sm">14:00h</span>
                                </li>
                                <li className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-700 p-2.5">
                                    <div className="flex items-center gap-2">
                                        <CircleCheck className="size-5 text-lime-500" />
                                        <span className="text-zinc-100">Corrida de Kart</span>
                                    </div>
                                    <span className="text-zinc-400 text-sm">14:00h</span>
                                </li>
                            </ul>
                        )
                }
            </li>
        </ul>
    )
}