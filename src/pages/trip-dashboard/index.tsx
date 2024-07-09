import { ArrowRight } from "lucide-react";
import { ModalCreateActivity } from "./modal-create-activity";
import { useState } from "react";
import { Button } from "../../components/button";
import { Header } from "./header";
import { ListImportantLinks } from "./list-important-links";
import { ListGuests } from "./list-guests";
import { ListActivities } from "./list-activities";

export function PageTripDashboard() {
    const [modalCreateActivityIsOpen, setModalCreateActivityIsOpen] = useState(false)

    const openModalCreateActivity = () => setModalCreateActivityIsOpen(true)
    const closeModalCreateActivity = () => setModalCreateActivityIsOpen(false)

    return (
        <section className="h-screen w-screen bg-pattern bg-no-repeat bg-center max-w-6xl mt-10 m-auto flex flex-col gap-8">
            <Header />
            <main className="grid grid-cols-[1fr,320px] px-6 h-full gap-16">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-white text-3xl">Atividades</h1>
                        <Button variant="primary" onClick={openModalCreateActivity}>
                            Cadastrar atividade
                            <ArrowRight className='size-5' />
                        </Button>
                    </div>
                    <ListActivities />
                </div>
                <aside className="flex flex-col gap-6">
                    <ListImportantLinks />
                    <hr className='w-full h-px bg-zinc-800' />
                    <ListGuests />
                </aside>
            </main>

            <ModalCreateActivity
                isOpen={modalCreateActivityIsOpen}
                closeModal={closeModalCreateActivity}
            />
        </section>
    )
}