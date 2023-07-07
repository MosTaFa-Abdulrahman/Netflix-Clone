import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dkqpzws52",
        cloudPreset: "lzni91lo",
      },
      (err, res) => {
        res && console.log(res);
        err && console.log(err.message);
      }
    );
  }, []);

  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
};

export default UploadWidget;
