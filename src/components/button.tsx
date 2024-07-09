import { ComponentProps, PropsWithChildren } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
    base: 'rounded-lg font-medium px-5 py-2 flex items-center justify-center gap-2',

    variants: {
        variant: {
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        },
        full: {
            true: 'w-full'
        }
    },

    defaultVariants: {
        variant: "primary",
        full: false
    }
})

interface IButton extends PropsWithChildren, ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
}
export function Button({ children, full, variant, ...buttonProps }: IButton) {
    return (
        <button {...buttonProps} className={buttonVariants({ variant, full })}>
            {children}
        </button>
    )
}