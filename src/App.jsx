import React, {useEffect, useRef} from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import UrlComponent from "./components/UrlComponent";
import ThumbnailComponent from "./components/ThumbnailComponent";
import Header from "./Layout/Header";
import MediaCard from './Layout/MediaCard';
import PdfComponent from "./components/PdfComponent";

function ScrollToTop(){
  const {state} = useLocation();
  const hasScrolled = useRef(false);

  React.useEffect(()=>{
    if(state?.scrollTo && !hasScrolled.current){
      const element = document.getElementById(state.scrollTo);
      if(element){
        element.scrollIntoView({ behavior:"smooth" });
        hasScrolled.current = true;
      }
    }
  }, [state]);
  return null;
}

function App() {
  return (
    <Router>
    <Header />
    <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<UrlComponent />}></Route>
        <Route path="/thumbnail" exact element={<ThumbnailComponent />}></Route>
        <Route path="/card" exact element={<MediaCard/>}></Route>
        <Route path="/ImgtoPdf" exact element={<PdfComponent />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
