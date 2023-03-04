import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tamagotchi from "./components/Tamagotchi";
import ContextProvider from "./context/ContextProvider";

const App: React.FC = () => {
  return (
    <ContextProvider>
      <div className="bg-gradient-to-t from-[#101820] to-black h-screen">
        <Navbar />
        <div className="pt-[120px]">
          <Routes>
            <Route path="/tamagotchi" element={<Tamagotchi />} />
          </Routes>
        </div>
      </div>
    </ContextProvider>
  );
};
export default App;
