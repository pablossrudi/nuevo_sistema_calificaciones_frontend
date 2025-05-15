import type { ReactNode } from "react"
import { Content, Header } from "../modals/modalItems";

interface Props {
    open: boolean
    title: string
    children: ReactNode;
    onClose: () => void;
}

export const SubMenu = ({ open, title, children, onClose }: Props) => {
    if (!open) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 flex justify-end items-center bg-transparent">
            <div className=" absolute top-20 right-4 flex flex-col p-5 space-y-9 bg-primary shadow-primary hover:shadow-lg z-10">
                <Header title={title} onClose={onClose} />
                <Content>
                    {children}
                </Content>
            </div>
        </div>
    );

}