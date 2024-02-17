import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UrlComponent from "./components/UrlComponent";
import ThumbnailComponent from "./components/ThumbnailComponent";
import Header from "./Layout/Header";
import MediaCard from './Layout/MediaCard';

function App() {
  return (
    <Router>
    <Header />
      <Routes>
        <Route path="/" exact element={<UrlComponent />}></Route>
        <Route path="/thumbnail" exact element={<ThumbnailComponent />}></Route>
        <Route path="/card" exact element={<MediaCard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
