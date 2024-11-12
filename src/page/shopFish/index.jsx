import { useState } from "react";
import MenuForShop from "../../components/menu";
import Naviagtion from "../../components/navigation";

function FishShop() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [resetFish, setResetFish] = useState(false);

  const triggerReset = () => {
    setResetFish(true); // Trigger the reset
    setTimeout(() => setResetFish(false), 100); // Reset the flag after triggering
  };

  return (
    <>
      <Naviagtion selectedMenu={selectedMenu} triggerReset={triggerReset} name="Shop" />
      <MenuForShop 
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        resetFish={resetFish}
      />
    </>
  );
}
export default FishShop;
