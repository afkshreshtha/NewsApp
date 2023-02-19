import React, {  useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



const App = () => {

  const apiKey = process.env.REACT_APP_KEY 

  const [progress, setProgress] = useState(0);




  return (
    <div>
      <Router>

        <Navbar />
        <LoadingBar
          color='red'
          progress={progress}
        />
        <Routes>
          <Route eact path='/' element={<News apikey={apiKey} setProgress={setProgress} key="home" category="general" />} />
          <Route exact path='/general' element={<News apikey={apiKey} setProgress={setProgress} key="general" category="general" />} />
          <Route exact path='/business' element={<News apikey={apiKey} setProgress={setProgress} key="business" category="business" />} />
          <Route exact path='/entertainment' element={<News apikey={apiKey} setProgress={setProgress} key="entertainment" category="entertainment" />} />
          <Route exact path='/science' element={<News apikey={apiKey} setProgress={setProgress} key="science" category="science" />} />
          <Route exact path='/health' element={<News apikey={apiKey} setProgress={setProgress} key="health" category="health" />} />
          <Route exact path='/technology' element={<News apikey={apiKey} setProgress={setProgress} key="technology" category="technology" />} />
          <Route exact path='/sports' element={<News apikey={apiKey} setProgress={setProgress} key="sports" category="sports" />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App