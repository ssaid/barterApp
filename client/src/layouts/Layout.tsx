import { FC, PropsWithChildren } from "react"
import { Navbar } from "../features/navbar"


export const Layout: FC<PropsWithChildren> = ({ children }) => {


  return (
    <>
      <Navbar/>
      {children}
    </>
  )

}
