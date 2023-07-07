import "./list.scss";
import ListItem from "../listItem/ListItem";
import { useRef, useState } from "react";

function List({ list }) {
  const [sliderNumber, setSliderNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();

  const handleClick = (dir) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (dir === "left" && sliderNumber > 0) {
      setSliderNumber(sliderNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (dir === "right" && sliderNumber < 5) {
      setSliderNumber(sliderNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list?.title}</span>
      <div className="wrapper">
        <i
          className="fa-solid fa-arrow-left sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        ></i>
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} key={i} item={item} />
          ))}
        </div>
        <i
          className="fa-solid fa-arrow-right sliderArrow rigth"
          onClick={() => handleClick("right")}
        ></i>
      </div>
    </div>
  );
}

export default List;
