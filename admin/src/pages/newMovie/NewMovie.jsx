import "./newMovie.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { publicRequest } from "../../requestMethod";

function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("movie/create", movie);
      window.location.replace("/movies");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>

      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Sm Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
            required
          />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title..."
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description..."
            name="desc"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year..."
            name="year"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <select name="genre" onChange={handleChange}>
            <optgroup label="Genre" />
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="number"
            placeholder="Limit..."
            name="limit"
            onChange={handleChange}
            required
          />
        </div>

        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleCreate}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
export default NewMovie;
