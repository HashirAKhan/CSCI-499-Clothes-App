import { useEffect, useRef, useState, setState } from "react";
import Navbar from "../Navbar";
import "../../css/saveoutfitpage.css";
import ItemImages from "../ItemImages";
import SavedItem from "../SavedItemComponent";

export default function SaveOutfit() {
  let outfit_list = [];
  const [outfits, setOutfits] = useState([]);
  const rendered = useRef(false);
  const rendered_value = rendered.current;

  const [itemimages, setItemImages] = useState([]);
  const [itemids, setItemIds] = useState([]);
  const [itemlabels, setItemLabels] = useState([]);
  const [viewitemimage, setViewItemImage] = useState("");
  const [viewitemid, setViewItemId] = useState("");


  useEffect(() => {

    const outfitListUl = document.getElementById("outfits");
    while (outfitListUl.lastChild) {
      outfitListUl.lastChild.remove();
    }

    setOutfitList();

  }, []);

  function setOutfitList() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      let outfitList = JSON.parse(xhr.response);
      //console.log(outfitList)
      //will create an outfits list and populate it with the
      //outfit names
      let saved_outfits = outfitList["outfits"];
      if (saved_outfits.length != 0) {
        for (let i = 0; i < saved_outfits.length; i++) {
          const object = JSON.parse(saved_outfits[i]);
          outfit_list.push(object);
        }
      }

      outfit_list.forEach((outfit) =>
        setOutfits((oldArray) => [...oldArray, outfit])
      );

      //console.log(outfits);
    });

    const data = JSON.stringify({ email: localStorage.getItem("email") });
    console.log(data);
    xhr.open("POST", "http://localhost:8080/getOutfits");
    xhr.send(data);
    //console.log("running")
    rendered.current = true;
  }

  function onChange(id){
    setViewItemId(id);
  }

  function fetchOutfit(e) {
    let xhr = new XMLHttpRequest();
    let item_image_array = [];
    let item_id_array = [];
    let item_label_array = [];
    const data = JSON.stringify({ id: e.target.dataset.value });

    xhr.addEventListener("load", () => {
      let temp = JSON.parse(xhr.response);
      let data = temp["items"];
      if (data.length != 0){
        for (let i = 0; i < data.length; i++) {
          const object = JSON.parse(data[i]);
          // item_id_array.push(object["id"]);
          // item_image_array.push(`data:image/png;base64,${object["image"]}`);
          // item_label_array.push(object["name"]);
        }
      }

      // setItemLabels(item_label_array);
      // setItemIds(item_id_array);
      // setItemImages(item_image_array);


      // item_label_array.forEach((itemlabel) =>
      //   setItemLabels((oldArray) => [...oldArray, itemlabel])
      // );
      // item_id_array.forEach((itemid) =>
      //   setItemIds((oldArray) => [...oldArray, itemid])
      // );
      // item_image_array.forEach((itemimage) =>
      //   setItemImages((oldArray) => [...oldArray, itemimage])
      // );
    });

    xhr.open("POST", "http://localhost:8080/outfitLookUp");
    xhr.send(data);
    console.log("running load images")

    //console.log(id);

  }

  function loadOutfitImages(){
    console.log("function running")
    let item_image_array = [];
    let item_id_array = [];
    let item_label_array = [];
    let xhr = new XMLHttpRequest();
    console.log("parse call")
    xhr.addEventListener("load", () => {
      //console.log("parse response")
      let temp = JSON.parse(xhr.response);
      console.log("parse response")
      console.log(xhr.response)
      //console.log(temp)
      // let data = temp["items"];
      // if (data.length != 0){
      //   for (let i = 0; i < data.length; i++) {
      //     const object = JSON.parse(data[i]);
      //     item_id_array.push(object["id"]);
      //     item_image_array.push(`data:image/png;base64,${object["image"]}`);
      //     item_label_array.push(object["name"]);
      //   }
      // }
      //
      // // setItemLabels(item_label_array);
      // // setItemIds(item_id_array);
      // // setItemImages(item_image_array);
      //
      //
      // item_label_array.forEach((itemlabel) =>
      //   setItemLabels((oldArray) => [...oldArray, itemlabel])
      // );
      // item_id_array.forEach((itemid) =>
      //   setItemIds((oldArray) => [...oldArray, itemid])
      // );
      // item_image_array.forEach((itemimage) =>
      //   setItemImages((oldArray) => [...oldArray, itemimage])
      // );
    });
    xhr.open("POST", "http://localhost:8080/outfitLookUp");
    console.log("parse call to backend")
  }


  return (
    <>
      <Navbar />

      <div id="save-outfit">
        <div id="outfit-list">
          <ul id="outfits">
            {outfits.map((outfit) => (
              <li
                key={outfit["id"]}
                data-value={outfit["id"]}
                onClick={fetchOutfit}
              >
                {" "}
                {outfit["name"]}{" "}
              </li>
            ))}
          </ul>
        </div>

        <div id="view-saved">
          <ul id="outfits">
            <ItemImages
              itemimages={itemimages}
              itemids={itemids}
              itemlabels={itemlabels}
              onChange={onChange}
            />
          </ul>
        </div>
      </div>
    </>
  );
}
