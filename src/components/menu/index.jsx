import { Input, Menu } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import api from "../../config/api";
import Card from "../../card";

function MenuForShop({ setSelectedMenu, resetFish }) {
  const [fish, setFish] = useState([]);
  const [filteredFish, setFilteredFish] = useState([]);

  // Fetch the fish data from the API
  const fetchFish = async () => {
    try {
      const response = await api.get("Koi");
      setFish(response.data);
      setFilteredFish(response.data); // Initially show all fish
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFish(); // Fetch the fish list on component mount
  }, []);

  // This useEffect will reset the fish list when resetFish is true
  useEffect(() => {
    if (resetFish) {
      setFilteredFish(fish); // Reset to show all fish
      setSelectedMenu(""); // Clear the breadcrumb selection
    }
  }, [resetFish, fish, setSelectedMenu]);

  const items = [
    {
      label: <Input.Search placeholder="Search Your Koi" />,
      key: "search",
    },
    { label: "Kohaku", key: "kohaku" },
    { label: "Sanke", key: "sanke" },
    { label: "Showa", key: "showa" },
    { label: "Tancho", key: "tancho" },
    { label: "Utsurimono", key: "utsurimono" },
    { label: "Asagi", key: "asagi" },
    { label: "String", key: "string" },
  ];

  // Handle the menu item click and filter the fish
  const onClickMenu = (e) => {
    const clickedKey = e.key;
    if (clickedKey === "search") {
      setFilteredFish(fish); // Reset to show all fish when clicking on search
      setSelectedMenu(""); // Clear breadcrumb when clicking search
    } else {
      const filtered = fish.filter(
        (item) => item.name.toLowerCase() === clickedKey.toLowerCase()
      );
      setFilteredFish(filtered);
      setSelectedMenu(clickedKey); // Update breadcrumb with selected filter
    }
  };

  return (
    <>
      <div className="containerMenuAndFishList">
        <Menu className="menuBar" onClick={onClickMenu} items={items} />
        <div className="menuFish">
          {filteredFish.map((item) => (
            <Card key={item.id} fish={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuForShop;
