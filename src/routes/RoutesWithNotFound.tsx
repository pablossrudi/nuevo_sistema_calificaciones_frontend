import type { ReactNode } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { NotFound } from "../pages/public/NotFound"

interface Props {
    children: ReactNode
}

export const RoutesWithNotFound = ({ children }: Props) => {
    return (
        <Routes>
            {children}
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
        </Routes>
    )
}