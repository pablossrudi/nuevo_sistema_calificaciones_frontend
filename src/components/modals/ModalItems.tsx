import type { ReactNode } from "react"
import { X } from "lucide-react"

interface Header {
    title: string
    onClose: () => void
}


interface Props {
    children: ReactNode;
}

export const Header = ({title, onClose}: Header) => {
    return(
        <div className="flex justify-between w-full bg-primary">
            <h1 className="text-2xl text-gray-700 font-bold">{title}</h1>
            <div className="cursor-pointer" onClick={onClose}>
                <X />
            </div>
        </div>
    )
}

export const Content = ({children}: Props) => {
    return(
        <div className="flex flex-col w-full bg-primary">
            {children}
        </div>
    )
}

export const Footer = ({children}:Props) => {
    return(
        <div className="flex w-full space-x-4 bg-primary">
            {children}
        </div>
    )
}