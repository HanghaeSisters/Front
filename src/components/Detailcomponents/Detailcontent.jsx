import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __deletePost } from "../../redux/modules/postSlice";

const DetailContent = ({ state, posts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = () => {
    if (!window.confirm("해당글을 삭제하시겠습니까?")) return;
    dispatch(__deletePost(state.postId));
    window.location.href = "/";
  };

  const updateHandler = () => {
    if (!window.confirm("해당글을 수정하시겠습니까?")) return;
    const newContent = {
      postId: posts.postId,
      title: posts.title,
      category: posts.category,
      price: posts.price,
      content: posts.content,
      imageBefore: posts.imageBefore,
      imageAfter: posts.imageAfter,
      hospitalAddress: posts.hospitalAddress,
      doctor: posts.doctor,
    };

    navigate(`/postingEdit`, { state: newContent });
  };
  return (
    <DetailSection>
      <div className="title">
        <h3>글제목: </h3>
        <p>{posts.title}</p>
        <h3>
          <span>글번호:</span>
        </h3>
        <p>{posts.postId}</p>
        <button onClick={deleteHandler} className="titlebtn1">
          게시글 삭제
        </button>
        <button onClick={updateHandler}>게시글 수정하기</button>
      </div>
      <article className="content">
        <h2>내 용</h2>
        <div className="imgBox">
          <div className="img">
            <img src={posts.imageBefore} alt="이미지 전"></img>
            <h2 className="imgAlt">성형 전</h2>
          </div>
          <div className="img">
            <img src={posts.imageAfter} alt="이미지 후"></img>
            <h2 className="imgAlt">성형 후</h2>
          </div>
        </div>
        <h2>시술 정보</h2>
        <div className="contentText">
          <p className="price">
            <span>가격:</span>
            {posts.price}
          </p>
          <p className="price">
            <span>내용:</span>
            {posts.content}
          </p>
        </div>
      </article>
      <h2 className="infoT">병원 정보</h2>
      <div className="info">
        <p>
          <span>병원 주소:</span>
          {posts.hospitalAddress}
        </p>
        <p>
          <span>원 장:</span> {posts.doctor}
        </p>
        <p>
          <span>카테고리:</span> {posts.category}
        </p>
      </div>
    </DetailSection>
  );
};

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 30px;
  font-family: "GongGothicMedium";
  border: 2px solid #e5dbff;
  box-sizing: border-box;

  button {
    font-family: "GongGothicMedium";
  }
  .infoT {
    font-size: 1.2rem;
    padding: 2% 2%;
  }
  //타이틀 css
  .title {
    border: 2px solid #e5dbff;
    padding: 1% 2%;
    margin-bottom: 2%;
    p {
      display: inline-block;
      width: 25%;
      font-size: 1.2rem;
    }
    h3 {
      display: inline-block;
      width: 10%;
    }
    button {
      display: inline-block;
      position: relative;
      height: 30px;
      width: 110px;
      border: none;
      background-color: #dcd0e6da;
      cursor: pointer;
    }
    .titlebtn1 {
      margin-right: 20px;
    }
  }

  //내용 css
  .content {
    padding: 1% 2%;
    margin-bottom: 2%;
    box-sizing: border-box;
    h2 {
      font-size: 1.6rem;
    }
    .imgBox {
      display: flex;

      .img {
        width: calc(100% - 20px);
        padding: 2% 2%;
        .imgAlt {
          display: block;
          padding: 3% 3%;
          text-align: center;
        }
        img {
          width: 100%;
        }
      }
    }
    .contentText {
      padding: 2% 2% p {
        span {
          padding-right: 1%;
        }
      }
      .price {
        display: inline-block;
        width: 80%;
        font-size: 1.2rem;
        padding: 2% 2%;
      }
      h3 {
        display: inline-block;
        width: 5%;
      }
    }
  }

  //정보 css

  .info {
    padding: 1% 2%;
    margin-bottom: 2%;
    border: 2px solid #e5dbff;
    p {
      font-size: 1.2rem;
      span {
        display: inline-block;
        padding: 1% 1%;
      }
    }
  }
`;

export default DetailContent;
