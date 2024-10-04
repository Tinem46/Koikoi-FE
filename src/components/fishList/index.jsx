import { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import Card from "../../card";
import "./index.scss";

function FishList() {
  const [fish, setFish] = useState([]);

  const fetchFish = async () => {
    try {
      const response = await api.get("Koi");
      setFish(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchFish();
  }, []);

  return (
    <div className="fish-list">
      {fish.map((item) => (
        <Card key={item.id} fish={item} />
      ))}
    </div>
  );
}

export default FishList;