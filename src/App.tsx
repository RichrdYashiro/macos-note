

import './App.css'
import { Route,  Routes } from 'react-router'
import NoteLayout from './components/layouts/NoteLayout'
import Workspace from './components/notes/Workspace'
function App() {

  return (
    <>
<Routes>

    <Route path="/" element={<NoteLayout />}>
      <Route path="notes/:id" element={<Workspace />} />
    </Route>

</Routes>

   
    
    </>
  )
}

export default App
