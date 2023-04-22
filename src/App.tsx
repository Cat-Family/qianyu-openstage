import { Outlet, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Routes>
      <Route
        element={
          <div>
            <h1>Layout</h1>
            <Outlet />
          </div>
        }
      >
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/about" element={<h2>About</h2>} />
      </Route>
    </Routes>
  )
}

export default App
