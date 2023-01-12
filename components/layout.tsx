import Drawer from "./menu/drawer"

export default function Layout({children}: {children: any}) {
  
  return (
    <>
        <Drawer>{children}</Drawer>
    </>
  )
}