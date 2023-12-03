import Upcomming from "../../Components/Upcomming/Upcomming";
import Carosal from "./Carosal/Carosal";
import ParalexBanner from "./ParalexBanner/ParalexBanner";
import Specialiest from "./Specialiest/Specialiest";
import Subscribtion from "./Subscribtion/Subscribtion";
import TabSystemCatagory from "./TabSystem/TabSystemCatagory";

const Home = () => {
  return (
    <div>
      <Carosal />
      <Specialiest />
      <TabSystemCatagory />
      <ParalexBanner />
      <Upcomming />
      <Subscribtion />
    </div>
  );
};

export default Home;
