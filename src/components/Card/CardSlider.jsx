import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPosts } from "../../redux/modules/postSlice";
import { getCookie } from "../../shared/Cookie";

function CardSlider(props) {
  const selectedCategory = props.category;
  // mainbody컴포넌트에서 넘겨준 category값, get해올떄 payload 에 넣어줄 예정
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isLoading, error } = useSelector((state) => state.post);


  const cookie = getCookie("is_login");

  useEffect(() => {
    dispatch(__getPosts(selectedCategory));

  }, [selectedCategory, dispatch, cookie]);
  // dispatch가 되면 멈춰라, dispatch가 될때까지만 렌더링 되어라
  console.log(selectedCategory);
  // posts 가 category별로 넘어온 데이터라고 가정
  const onClick = (post) => {
    if (cookie) {
      navigate(`/detail/${post.postId}`, { state: post });
    } else {
      alert("더 많은 정보를 얻으시려면 로그인이 필요합니다!");
      navigate("/login");
    }
  };

  if (isLoading === true) {
    return <div>로딩 중....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <STContainer>
      <STInner>
        {posts?.map((post) => (
          <STCard
            key={post.postId}
            onClick={() => {
              onClick(post);
            }}
          >
            <img src={post.imageAfter} alt={"안녕하세요"} />
            <div>{post.title}</div>
            <div>{post.price}원</div>
          </STCard>
        ))}
      </STInner>
    </STContainer>
  );
}

const STContainer = styled.div`
  overflow: auto;
  height: 400px;
  width: 100%;
  font-family: "GongGothicMedium";
  ::-webkit-scrollbar {
    height: 12px;
    width: 20%;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #da5576; /*스크롤바의 색상*/
    background-clip: padding-box;
    border: 4px solid transparent;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
  ::-webkit-scrollbar-track {
    background-color: #e7438834;
  }
`;

const STInner = styled.div`
  width: 1100px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;
const STCard = styled.div`
  margin-top: 30px;
  width: 250px;
  height: 310px;
  background-color: #fff;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 2);
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 220px;
    height: 210px;
    margin: 15px 0px 15px 20px;
    background-color: #000;
  }
  div {
    text-align: center;
    margin: 0 15px;
    font-size: 17px;
  }
`;
export default CardSlider;
