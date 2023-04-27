import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useState } from "react";
import Navbar from "./Navbar";


function App() {
  const [isLoginView, setIsLoginView] = useState(false);

  const toggleView = () => {
    setIsLoginView((prevState) => !prevState);
  };

return (
  <div className="App">
    <header className="App-header">
      <h1>{isLoginView ? "Login" : "Register"}</h1>
    </header>
    <main>
      <ToastContainer/>
      {isLoginView ? (
        <LoginForm toggleView={toggleView} />
      ) : (
        <RegisterForm toggleView={toggleView} />
      )}
    </main>
  </div>
);
}

export default App;
