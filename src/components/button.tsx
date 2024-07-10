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
        },
        disabled: {
            true: "opacity-50 bg-zinc-700 text-zinc-200 hover:bg-zinc-700 cursor-not-allowed"
        }
    },

    defaultVariants: {
        variant: "primary",
        full: false,
        disabled: false
    }
})

interface IButton extends PropsWithChildren, ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
}
export function Button({ children, full, variant, disabled, ...buttonProps }: IButton) {
    return (
        <button {...buttonProps} disabled={disabled} className={buttonVariants({ variant, full, disabled })}>
            {children}
        </button>
    )
}