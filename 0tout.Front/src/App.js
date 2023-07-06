import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./Components/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<HomePage />} />
        </Route>
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
