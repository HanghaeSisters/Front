import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import DetailContent from "../components/Detailcomponents/Detailcontent";
import Comment from "../components/Comment/Comment";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { useLocation, useParams } from "react-router-dom";
import { __getPostss } from "../redux/modules/postsSlice";
import { getCookie } from "../shared/Cookie";

const Detail = () => {
  const { state } = useLocation();
  //메인페이지에서 받아오는 것
  const dispatch = useDispatch();
  const { id } = useParams();

  const { posts, isLoading, error } = useSelector((state) => state.posts);
  //메인페이지와 다른 url(전체를 불러오는 url)
  console.log("무엇이 넘어오나?", posts);

  console.log();
  const [isCookie, setIsCookie] = useState(false);
  const cookie = getCookie("is_login");

  //23번, 24번줄은 토큰 권한을 받기 위해 필요한 것들

  useEffect(() => {
    if(cookie){

      dispatch(__getPostss(id));
    }

    if (cookie !== undefined && cookie !== null) {
      setIsCookie(true);
      console.log(isCookie);
    }
    return;
  }, [dispatch, cookie, isCookie, id, state]);
  // dispatch가 되면 멈춰라, dispatch가 될때까지만 렌더링 되어라





  // 댓글을 쓰면 댓글에 대한 정보만 업데이트 해야 되지 않나?
  // 포스트에 댓글이 딸려있지만, 댓글만 업데이트 할 것이기 때문에
  // 댓글을 가져오는 APi가 있었어야 하지 않을까.. 
  // 지금 추가하지는 않을거지만, api가 없다면? 댓글은 새로고침을 해야 보인다.
  // 의견을 뭉러봊보자. 
  // useEffect(()=>{
  //   dispatch(__getComment())
  // })


  if (isLoading === true) {
    return <div>로딩 중....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  // console.log("댓글 있나?", posts.commentList);
  //메인페이지에서 get으로 받은 정보들을 useLocation을 통해 state로 넘겨받음.
  //넘겨받은 정보들을 아래와 같이 state라는 이름으로 자식컴포넌트에 props해줌.
  return (
    <>
      <Header />
      <Layout>
        <DetailContent state={state} posts={posts} />
        <CommentBox>
          <Comment posts={posts} />
        </CommentBox>
      </Layout>
    </>
  );
};

const CommentBox = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
export default Detail;
