import { BrowserRouter as Router, Route } from "react-router-dom"
import React from 'react'

import App from './app'

const data = {}

const AppRouter = () => (
  <Router>
      <div>
          <Route exact path="/" render={()=><App data={data}/>}/>
      </div>
  </Router>
)

export default AppRouter