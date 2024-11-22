import { useState } from "react";
import MenuForShop from "../../components/menu";
import NavBar from "../../components/navigation2";

function FishShop() {
  const [selectedMenu, setSelectedMenu] = useState("All Koi");

 

  return (
    <>
      <NavBar 
        standOn="FishShop" 
        selectedMenu={selectedMenu}  
        className="Navigation"
      />
      <MenuForShop 
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
    </>
  );
}
export default FishShop;
