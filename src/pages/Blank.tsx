import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";

function Blank() {
  const sidebarToggle = useOutletContext() as () => void;
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">Blank Page</div>
      </main>
    </>
  );
}

export default Blank;
