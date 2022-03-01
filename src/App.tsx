import Landing from 'pages/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css"

const App = () => {
  return (
    <Router>
      <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
      </Switch>
    </Router>
  )
}

export default App