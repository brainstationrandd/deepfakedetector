import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink,
} from "react-router-dom";
import VideoUpload from "./VideoUpload";
function App() {
  return (
    <Router>
    <div className="App">
    <Route exact path="/">
      <div >
        <VideoUpload />
      </div>
    </Route>
    
    </div>
    </Router>
  );
}

export default App;
