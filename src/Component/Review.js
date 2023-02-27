import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { db, reviewsRef } from "../firebase/Firebase";
import {
  addDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { TailSpin, ThreeCircles } from "react-loader-spinner";
import swal from "sweetalert";
import { async } from "@firebase/util";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Review = ({ id, prevRating, rated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [data, setData] = useState([]);
  const [form, setForm] = useState("");
  const [xdata,setXdata] = useState(0)
  const useAppState = useContext(Appstate);

  const navigate = useNavigate()
  
  const addReviews = async () => {
    try {
      if (useAppState.login) {
        setLoading(true);
        setXdata(xdata+1)
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppState.userName,
          rating: rating,
          Comments: form,
          timestamp: new Date().getTime(),
        });
  
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: rated + 1,
        });
  
        setRating(0);
        setForm("");
        setLoading(false);
        swal({
          title: "successfully Added",
          icon: "success",
  
          buttons: false,
          timer: 3000,
        });
      } else {
        navigate('/login')
      }
     
    } catch (error) {
      swal({
        title: error,
        icon: "error",

        buttons: false,
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setData([])
      let querr = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(querr);
      
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewLoading(false);
    }
    getData();
  }, [xdata]);

  return (
    <div>
      <ReactStars size={30} half={true} onChange={(star) => setRating(star)} />

      <input
        type="text"
        value={form}
        onChange={(e) => setForm(e.target.value)}
        className="h header w-full p-2 outline-none text-black"
        placeholder="Share Your Reviews.."
      />
      <button onClick={addReviews} className="p bg-green-600 w-full mt-2 p-1">
        {loading ? (
          <div className="flex justify-center items-center ">
            <TailSpin height={25} />
          </div>
        ) : (
          "Share"
        )}
      </button>
      {reviewLoading ? (
        <div className="f flex mt-3 justify-center items-center">
          <ThreeCircles height={30} />
        </div>
      ) : (
        <div className="m mt-4">
          {data.map((e, i) => {
            return (
              <div
                className=" bg-gray-800 rounded mt-2 border-b border-gray-600 "
                key={i}
              >
                <div className="f flex justify-between items-center">
                  {" "}
                  <p className="t text-green-600">{e.name}</p>
                  <p className="t text-xs">
                    {new Date(e.timestamp).toLocaleString()}
                  </p>
                </div>
                <ReactStars edit={false} value={e.rating} />
                <p>{e.Comments}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
