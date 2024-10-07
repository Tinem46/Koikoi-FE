/* eslint-disable react/prop-types */
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
      setFilteredFish(response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFish(); 
  }, []);

  
  useEffect(() => {
    if (resetFish) {
      setFilteredFish(fish); 
      setSelectedMenu(""); 
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

  
  const onClickMenu = (e) => {
    const clickedKey = e.key;
    if (clickedKey === "search") {
      setFilteredFish(fish); 
      setSelectedMenu(""); 
    } else {
      const filtered = fish.filter(
        (item) => item.name.toLowerCase() === clickedKey.toLowerCase()
      );
      setFilteredFish(filtered);
      setSelectedMenu(clickedKey); 
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
