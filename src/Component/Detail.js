import { Reviews } from "@mui/icons-material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { db, movieRef } from "../firebase/Firebase";
import Review from "./Review";

const Detail = () => {
  const { id } = useParams();
  const [loading,setLoading] = useState(false)
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    async function getData() {
        setLoading(true)
        const _doc = doc(db,'movies',id)
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false)
    }
    getData();
  },[]);

  return (
    <div className="f  p-4 mt-4 flex-wrap flex flex-col md:flex-row items-center md:items-start w-full justify-center mx-11">
  {loading ? <Bars/> : <> 
      <img className="h h-96 sticky  top-20  md:sm:static" src={data.image} alt="" />
      <div className="md:ml-4 ml-0 w-96">
        <h3 className="t text-3xl font-bold text-gray-400">
          {data.title} <span className="x text-xl "> {data.year}</span>
        </h3>
        <ReactStars edit={false} value={data.rating/data.rated} size={25} />

        <p className="mt-2"> {data.description}</p>
      <Reviews/>
      <Review id={id } prevRating={data.rating} rated = {data.rated}/>
      </div>
      </>}
    </div>
  );
};

export default Detail;
