import { useEffect, useState } from "react";
import api from "../../config/api";
import Card from "../../card";
import "./index.scss";

function FishList({ Type }) {
  const [fish, setFish] = useState([]);

  const fetchFish = async () => {
    try {
      const response = await api.get("Koi");
      setFish(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFish();
  }, []);

  return (
    <div className="fish-list">
      {fish.slice(0, 3).map((item) => (
        <Card key={Type ? item.type : item.id} fish={item} />
      ))}
    </div>
  );
}

export default FishList;
