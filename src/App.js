import Header from "./components/Header";

import Movies from "components/Movies";
import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

function App() {
  return (
    
     <Router>
      <div className="container mx-auto grid gap-y-6 pt-8"> 
       <Header/>
        <Routes>
          <Route exact path="/" element={<Movies/>} /> 
          {/* <Route path="/favorites" element={<FavoriFilmler/>} />  */}
        </Routes>
      </div>
    </Router>
      
  );
}

export default App;
