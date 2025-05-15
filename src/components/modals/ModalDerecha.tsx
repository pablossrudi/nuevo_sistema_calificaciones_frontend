import type { ReactNode } from "react";
import { Content, Header } from "./modalItems";

interface Props {
    open: boolean;
    title: string;
    children: ReactNode
    onClose: () => void;
    onConfirm?: () => Promise<void>;
}

export const ModalDerecha = ({ open, title, children, onClose }: Props) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex justify-end bg-semi-transparent z-50">
            <div className="flex flex-col w-xs p-5 bg-primary space-y-6">
                <Header title={title} onClose={onClose} />
                <Content>
                    {children}
                </Content>
            </div>
        </div>
    )
}