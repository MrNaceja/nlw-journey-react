import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";

export function Header() {
    return (
        <header className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-700 px-6 py-5">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-200 flex-1">Florianópolis, Brasil</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-200 flex-1">17 à 23 de Agosto</span>
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