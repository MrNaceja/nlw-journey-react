import { CircleCheck, UserCog } from "lucide-react";

export function ListGuests() {
    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-xl">Links importantes</h3>
            <ul className="flex flex-col gap-5">
                <li className="flex justify-between items-center">
                    <div className="flex flex-col gap-1.5">
                        <h5 className="text-zinc-100">Sherman Swaniawski</h5>
                        <span className="text-zinc-400 text-sm">toney_bernier@yahoo.com</span>
                    </div>
                    <CircleCheck className="size-5 text-lime-500" />
                </li>
                <li className="flex justify-between items-center">
                    <div className="flex flex-col gap-1.5">
                        <h5 className="text-zinc-100">Sherman Swaniawski</h5>
                        <span className="text-zinc-400 text-sm">toney_bernier@yahoo.com</span>
                    </div>
                    <CircleCheck className="size-5 text-lime-500" />
                </li>
            </ul>
            <button className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 flex items-center justify-center gap-2 hover:bg-zinc-700'>
                <UserCog className='size-5' />
                Gerenciar convidados
            </button>
        </div>
    )
}