import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import PageNotFound from "./Pages/PageNotFound";
import Upload from "./Pages/UploadPage/Upload";
import Signin from "./Pages/SigninPage/Signin";
import Profile from "./Pages/ProfilePage/Profile";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
