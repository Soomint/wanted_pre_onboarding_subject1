import './App.css'
import About from './pages/About'
import Root from './pages/Root'
import { Router, Route } from './Router'

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={<Root />} />
        <Route path="/about" component={<About />} />
      </Router>
    </>
  )
}

export default App
