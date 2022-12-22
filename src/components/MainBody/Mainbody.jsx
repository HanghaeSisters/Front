import { useState } from "react";
import styled from "styled-components";
import CardSlider from "../Card/CardSlider";

function MainBody() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("눈성형");
  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tableClickHandler(0, "눈성형")}
        >
          눈
        </li>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tableClickHandler(1, "코성형")}
        >
          코
        </li>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tableClickHandler(2, "턱성형")}
        >
          턱
        </li>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? "is-active" : ""}
          onClick={() => tableClickHandler(3, "지방흡입")}
        >
          지방흡입
        </li>
      ),
    },
  ];

  const tableClickHandler = (index, category) => {
    setActiveIndex(index);
    setActiveCategory(category);
    console.log(index, category);
  };

  return (
    <div>
      <div className="tabTitle">
        <STTab className="tabs is-boxed">
          {tabContArr.map((section) => {
            return section.tabTitle;
          })}
        </STTab>
      </div>
      <div clssName="card">
        <CardSlider category={activeCategory} />
      </div>
    </div>
  );
}
const STTab = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 100%;
  padding: 0px 20px 0px 20px;
  background-color: #e7a0beca;
  font-family: "GongGothicMedium";
  //border: 1px solid;
  li {
    text-align: center;
    width: 25%;
    padding: 13px 15px;
    display: block;
    font-size: 20px;

    color: #ffffff;
    text-decoration: none;
    &:hover {
      background-color: #dd5cbd47;
      color: #ffffff;
    }
  }
`;
export default MainBody;
