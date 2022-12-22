import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __delComment } from "../../redux/modules/commentSlice";

const CommentLists = ({ comment }) => {
  //comment 컴포넌트에서 댓글리스트를 props로 넘겨받음.
  // console.log("댓글 리스트는", comment);
  //console.log에 댓글 리스트들 잘 출력되고 있음.
  
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [editcontent, setEditcontent] = useState("");


  const del_comment = (id) => {
    console.log("댓글 삭제/",id);
    dispatch(__delComment(id))
  };

  const edit_starCommit = (id) => {
    console.log("isEdit?/", id);
    // dispatch
  };

  const upDatecontent = () => {
    console.log("수정완료/");
    // dispatch
  };
  return (
    <>
      <ComListBox>
        <Box>
          <p className="user">{comment.username}</p>
          <p className="text">{comment.content}</p>
          <BtnBox>
            <button onClick={()=>{del_comment(comment.commentId)}}>삭제</button>
            <button onclick={edit_starCommit}>수정</button>
          </BtnBox>
        </Box>
      </ComListBox>
    </>
  );
};

const ComListBox = styled.div`
  textarea {
    width: 100%;
    height: 60px;
    /* resize: none; */
    outline: none;
    border: none;
    padding: 5px 10px;
    box-sizing: border-box;
  }
`
const Box = styled.div`
  height: 80px;
  border: 1px solid black;
  display: flex;
  justify-content: flex-start;
  font-family: "GongGothicMedium";
  margin-bottom: 10px ;
  .user{
    width: 150px;
    height: 100%;
    background-color: lightcyan;
    padding: 15px;
    box-sizing: border-box;
  }
  .text{
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
  }
`
const BtnBox = styled.div`
  border: 1px solid red;
`

export default CommentLists;
