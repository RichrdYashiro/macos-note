

import { Outlet } from "react-router-dom"
import Sidebar from "../notes/Sidebar"


function NoteLayout() {
  return (
    <div>
      <div className="Notes__wrapper">
      <Sidebar />
      <Outlet/>
      </div>
    </div>
    
  )
}

export default NoteLayout