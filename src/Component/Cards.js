import { Circle } from "@mui/icons-material";
import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { movieRef } from "../firebase/Firebase";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getdata() {
      setLoading(true);
      const _data = await getDocs(movieRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getdata();
  }, []);

  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="f flex justify-center items-center w-full">
          {" "}
          <ThreeDots />
        </div>
      ) : (
        data &&
        data.map((e, id) => {
          return (
            <Link to={`detail/${e.id}`}>
              <div
                className="card font-medium shadow-lg p-2
    hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-700"
              >
                <img className="h-60 md:h-72" src={e.image} alt="" />
                <h1 className="text-gray-600">
                  {e.title}
                </h1>
                <h1 className="d flex flex-wrap items-center ml-2">
                  <span className="text-grey-500">Rating:</span>{" "}
                  <ReactStars edit={false} value={e.rating / e.rated} />
                </h1>
                <h1>
                  <span className="text-grey-500">Year:</span> {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
