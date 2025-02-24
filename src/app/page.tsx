import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";

const Home = () => {

  return (
    <div className="relative overflow-hidden">
    <Desktop/>
    <Taskbar/>
    </div>
  )
};

export default Home;