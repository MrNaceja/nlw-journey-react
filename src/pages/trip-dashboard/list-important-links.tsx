import { Link2, Plus } from "lucide-react";

export function ListImportantLinks() {
    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-xl">Links importantes</h3>
            <ul className="flex flex-col gap-5">
                <li className="flex justify-between items-center gap-3">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <h5 className="text-zinc-100">Reserva do AirBnB</h5>
                        <a className="text-zinc-400 text-xs truncate hover:text-lime-400 cursor-pointer">https://www.airbnb.com.br/rooms/104700011dddddddddddddddddddddddddddddddddd</a>
                    </div>
                    <Link2 className="size-5 text-white" />
                </li>
                <li className="flex justify-between items-center gap-3">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <h5 className="text-zinc-100">Reserva do AirBnB</h5>
                        <a className="text-zinc-400 text-xs truncate hover:text-lime-400 cursor-pointer">https://www.airbnb.com.br/rooms/104700011</a>
                    </div>
                    <Link2 className="size-5 text-white" />
                </li>
            </ul>
            <button className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 flex items-center justify-center gap-2 hover:bg-zinc-700'>
                <Plus className='size-5' />
                Cadastrar novo link
            </button>
        </div>
    )
}