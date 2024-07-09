
import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, Plus, AtSign } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

export function App() {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [hasLocationDefined, setHasLocationDefined] = useState(false)
  const [emailsInvited, setEmailsInvited] = useState<string[]>([])

  const confirmLocation = () => setHasLocationDefined(true)
  const changeLocation = () => setHasLocationDefined(false)

  const openModalGuests = () => dialogRef.current?.showModal()
  const closeModalGuests = () => dialogRef.current?.close()

  const handleSubmitEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget;
    const data = new FormData(form);
    const invitedEmail = data.get('guest-email')?.toString();
    if (!invitedEmail) return;
    if (emailsInvited.includes(invitedEmail)) {
      form.getElementsByTagName('input')[0].setCustomValidity('Este email já foi convidado.')
      return;
    }
    setEmailsInvited([...emailsInvited, invitedEmail]);

    form.reset();
  }

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
                  <button className='bg-lime-300 text-lime-950 rounded-lg font-medium px-5 py-2 flex items-center gap-2 hover:bg-lime-400' onClick={confirmLocation}>
                    Continuar
                    <ArrowRight className='size-5' />
                  </button>
                )
                : (
                  <button className='bg-zinc-800 text-zinc-200 rounded-lg font-medium px-5 py-2 flex items-center gap-2 hover:bg-zinc-700' onClick={changeLocation}>
                    Alterar local/data
                    <Settings2 className='size-5' />
                  </button>
                )
            }
          </div>
          {
            hasLocationDefined && (
              <div className="w-full px-4 h-16 rounded-xl bg-zinc-900 flex items-center gap-5">
                <button className='flex items-center gap-2 flex-1 text-left' type='button' onClick={openModalGuests}>
                  <UserRoundPlus className='size-5 text-zinc-400' />
                  <span className='text-lg text-zinc-400 flex-1'>Quem estará na viagem?</span>
                </button>

                <span className='w-px h-6 bg-zinc-800' />

                <button className='bg-lime-300 text-lime-950 rounded-lg font-medium px-5 py-2 flex items-center gap-2 hover:bg-lime-400' onClick={confirmLocation}>
                  Confirmar viagem
                  <ArrowRight className='size-5' />
                </button>
              </div>
            )
          }
        </main>
        <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
      </div>

      <dialog ref={dialogRef} className="backdrop:bg-black/60 backdrop:backdrop-blur-sm rounded-xl w-[640px] bg-zinc-900" onClick={e => (e.target == dialogRef.current && closeModalGuests())}>
        <main className='flex-col items-center space-y-5 p-6'>
          <header className='gap-2'>
            <div className='flex items-center justify-between'>
              <h1 className='text-lg text-white font-medium'>Selecionar convidados</h1>
              <button onClick={closeModalGuests}>
                <X className='size-5 text-zinc-400' />
              </button>
            </div>
            <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
          </header>
          <aside className='flex flex-wrap gap-2'>
            {
              emailsInvited.map(email => (
                <span key={email} className='bg-zinc-800 rounded-md flex justify-between py-1.5 px-2.5 text-zinc-300 items-center gap-2 font-light'>
                  {email}
                  <X className='size-4 cursor-pointer' onClick={() => removeEmailInvited(email)} />
                </span>
              ))
            }
          </aside>
          <hr className='w-full h-px bg-zinc-800' />
          <form onSubmit={handleSubmitEmailToInvite} className='bg-zinc-950 p-2.5 border border-zinc-800 flex justify-between rounded-lg'>
            <div className='flex items-center gap-2'>
              <AtSign className='size-5 text-zinc-400' />
              <input type="email" name="guest-email" placeholder="Digite o email do convidado" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-zinc-100" />
            </div>
            <button type="submit" className='bg-lime-300 text-lime-950 rounded-lg font-medium px-5 py-2 flex items-center gap-2 hover:bg-lime-400' onClick={confirmLocation}>
              Convidar
              <Plus className='size-5' />
            </button>
          </form>
        </main>
      </dialog>
    </section>
  )
}