import type { ReactNode } from "react";
import { Header } from "./modalItems";
import { Content } from "./modalItems"
import { Footer } from "./modalItems"

interface Props {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    onConfirm?: () => Promise<void>;
}

export const ModalCentrado= ({ open, title, children, onClose, onConfirm }: Props) => {
    if (!open) return null
   
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-semi-transparent z-50">
            <div className="flex flex-col lg:w-1/3 p-6 space-y-9 bg-primary">
                <Header title={title} onClose={onClose} />
                <Content>
                    {children}
                </Content>
                <Footer>
                    <>
                        <button
                            className="p-3 w-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="p-3 w-full bg-red-100 text-red-700 hover:bg-red-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                            onClick={onConfirm}
                        >
                            Eliminar Alumno
                        </button>
                    </>
                </Footer>
            </div>
        </div>
    )
}