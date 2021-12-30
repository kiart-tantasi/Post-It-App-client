import "./css/App.css"
import "./css/Media-Query.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PostContext from "./share/PostContext";
import Notes from "./Notes/Notes";
import UpdateNote from "./Updating Note/UpdateNote";
import AddNote from "./Adding Note/AddNote";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import Auth from "./Auth/Auth";
import EditRoute from "./Notes/EditRoute";

export default function App() {

  const { isLoading } = useContext(PostContext);
  const { posts } = useContext(PostContext);

  if (isLoading) {
    return <div>
      <h1 style={{"textAlign":"center","marginTop":"30px"}}>LOADING...</h1>
    </div>
  }

  return (
    <div className="flex-container">
      <Nav />
      <div className="flex-main-body">
      <Routes>
        <Route path="/posts/*" element={<div><AddNote /><Notes posts={posts} /><EditRoute /></div>} />
        <Route path="/update" element={<div><UpdateNote posts={posts} /><Notes posts={posts} /></div> } />
        <Route path="/authentication" element={<Auth />} />
        <Route path="/*" element={<Navigate to="/posts" />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}
