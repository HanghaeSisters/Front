import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentLists from "./CommentLists";
import styled from "styled-components";
import { __addComment } from "../../redux/modules/commentSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { __getPosts } from "../../redux/modules/postSlice";

const Comment = ({ posts }) => {
  console.log("댓글확인중입니다.", posts.commentList);
  // 메인페이지에서 get으로 받은 정보를 디테일페이지에서 state라는 이름으로 props로 받음.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // const content = useSelector((state) => state.props);
  // id로 넘어오는 값을 받는다 치고 1로 고정시켜서 데이터 출력함함
  // console.log("어떤값이 오나?", content);
  // 댓글창stae, 수정여부state
  const [isComment, setIsComment] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // 댓글text
  const [commentText, setCommentText] = useState("");

  const add_comment = () => {
    if (commentText.trim() === "") return alert("댓글 칸을 채워주세요!");
    const payload = { postId: id, content: commentText };
    dispatch(__addComment(payload));
    console.log(payload)
    setCommentText("");
    // console.log("comments", __postComments);
  };

  return (
    <>
      <ComWriteBox>
        <CommentBtn
          onClick={() => {
            setIsComment(!isComment);
          }}
        >
          (말풍선) 댓글쓰기
        </CommentBtn>
          {!isComment ? null : (
            <>
              <div className="com_box">
                <textarea
                  className="com_textarea"
                  value={commentText}
                  placeholder="좋은 정보는 모이면 모일수록, 좋지요~! 댓글을 작성해주세요."
                  onChange={(event) => {
                    const { value } = event.target;
                    setCommentText(value);
                    // console.log(e.target.value)
                  }}
                />
                <button onClick={add_comment}>등록</button>
              </div>
              {/* <div>글자수:____</div> */}
            </>
          )}
      </ComWriteBox>

      <ComListBox>
        {posts.commentList.map((comment) => (
          <CommentLists key={comment.commentId} comment={comment} />
        ))}
        {/* 디테일 페이지에서 넘겨받은 (posts)로 컴포넌트 리스트 컴포넌트로 props 해줌  */}
      </ComListBox>
    </>
  );
};

const ComWriteBox = styled.div`
  padding: 15px 25px;
  box-sizing: border-box;
  font-family: "GongGothicMedium";
    textarea {
      width: 100%;
      height: 60px;
      /* resize: none; */
      outline: none;
      border: none;
      padding: 5px 10px;
      box-sizing: border-box;
    }
    button {
      width: 130px;
      height: 100%;
      background-color: #dcd0e6da;
      border: none;
      cursor: pointer;
      /* margin: 10px; */
    }
  .com_box {
    border: 3px solid #e5dbff;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;

    box-sizing: border-box;
    .com_username {
      width: 180px;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #dcd0e6da;
      /* background-color: #ffec99; */
      /* background-color: #fff3bf; */
      /* background-color: #e5dbff; */
    }
    .com_text {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    .com_edit_textarea {
      width: 100%;
      height: 60px;
      /* resize: none; */
      outline: none;
      border: none;
      padding: 5px 10px;
      box-sizing: border-box;
    }
    .comBtn_box {
      width: 150px;
      height: 100%;
      padding: 10px 0;
      box-sizing: border-box;
      display: flex;
      button {
        width: 50px;
        background-color: #dcd0e6da;
        border: none;
        border-radius: 5px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
`;
const CommentBtn = styled.p`
  width: 200px;
  height: 40px;
  /* color: #7950f2; */
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #dcd0e6da;
`;
  
const ComListBox = styled.div`
`;
export default Comment;

//-------------------------------------- memo
// 다음번엔 날짜를 받는것도 좋을 것 같다.
// 후속처리 1시간전 이런 것도 시도해보자.
// 네이버 블로그 댓글창 보기
// 코멘트도 컴포넌트 더 쪼갤 수 있다. (item, list, writer)
// const commentList = () =>{
//       <CommentItem />
