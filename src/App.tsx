import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import TempleDetail from './components/TempleDetail'
import TempleForm from './components/TempleForm'
import TempleList from './components/TempleList'

function App() {
  const [selectedTemple, setSelectedTemple] = useState(null)
  const [editingTemple, setEditingTemple] = useState(null)

  const handleSelectTemple = (temple) => {
    setSelectedTemple(temple)
    setEditingTemple(null)
  }

  const handleEditTemple = (temple) => {
    setEditingTemple(temple)
    setSelectedTemple(null)
  }

  const handleBackToList = () => {
    setSelectedTemple(null)
    setEditingTemple(null)
  }

  return (
    <>
      <header>
        <h1>Temple Info App</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>
      <main>
        {editingTemple ? (
          <TempleForm
            temple={editingTemple}
            onSave={() => {
              setEditingTemple(null)
              setSelectedTemple(null)
            }}
            onCancel={() => setEditingTemple(null)}
          />
        ) : selectedTemple ? (
          <TempleDetail temple={selectedTemple} onBack={handleBackToList} />
        ) : (
          <TempleList
            onSelectTemple={handleSelectTemple}
            onEditTemple={handleEditTemple}
          />
        )}
        <Outlet />
      </main>
      <footer>
        <p>© 2024 Temple Info App</p>
      </footer>
    </>
  )
}

export default App
