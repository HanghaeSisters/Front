import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { __upDatePost } from "../../redux/modules/postSlice";
import styled from "styled-components";

const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  console.log("넘어오는 아이디값인가?", state.postId);

  const [inputs, setInputs] = useState({
    postId: state.postId,
    title: state.title,
    category: state.category,
    imageBefore: state.imageBefore,
    imageAfter: state.imageAfter,
    content: state.content,
    price: state.price,
    hospitalAddress: state.hospitalAddress,
    doctor: state.doctor,
  });

  const {
    postId,
    title,
    category,
    imageBefore,
    imageAfter,
    content,
    price,
    hospitalAddress,
    doctor,
  } = inputs;

  const onChnage = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const updateHandler = () => {
    if (title.trim() === "" || content.trim() === "" || category === "") {
      alert("내용과 제목을 입력해주세요");
      return;
    }
    const upDateContent = {
      postId: postId,
      title: title,
      category: category,
      imageBefore: imageBefore,
      imageAfter: imageAfter,
      content: content,
      price: price,
      hospitalAddress: hospitalAddress,
      doctor: doctor,
    };
    const payload = [upDateContent.postId, upDateContent];
    dispatch(__upDatePost(payload));

    console.log("잘 넘어갔나?", upDateContent);

    navigate(`/detail/${postId}`, { state: upDateContent });
  };

  return (
    <STForm onSubmit={updateHandler}>
      <STTitle>
        <STLabel>제목</STLabel>
        <STInput type="text" name="title" value={title} onChange={onChnage} />
      </STTitle>
      <STCategory>
        <STCLabel>수술부위</STCLabel>
        <STSelect name="category" onChange={onChnage}>
          <option name="category" value="">
            카테고리를 선택해주세요
          </option>
          <option name="category" value="눈성형">
            눈성형
          </option>
          <option name="category" value="코성형">
            코성형
          </option>
          <option name="category" value="턱성형">
            턱성형
          </option>
          <option name="category" value="지방흡입">
            지방흡입
          </option>
        </STSelect>
      </STCategory>

      <STImage>
        <STImageLabel>전</STImageLabel>
        <input
          type="url"
          name="imageBefore"
          value={imageBefore}
          onChange={onChnage}
        />
        <STImageLabel>후</STImageLabel>
        <input
          type="url"
          name="imageAfter"
          value={imageAfter}
          onChange={onChnage}
        />
      </STImage>
      <STContent>
        <STTextarea
          type="text"
          name="content"
          value={content}
          onChange={onChnage}
        />
      </STContent>
      <STPrice>
        <STPriceLabel>시술 비용</STPriceLabel>
        <input type="text" name="price" value={price} onChange={onChnage} />
        <STPriceLabel> 원</STPriceLabel>
      </STPrice>
      <STDoctor>
        <STInfoLabel>병원이름</STInfoLabel>
        <input
          type="text"
          name="hospital-name"
          value={hospitalAddress}
          onChange={onChnage}
        ></input>
        <STInfoLabel>원장님 성함</STInfoLabel>
        <input
          type="text"
          name="doctor"
          value={doctor}
          onChange={onChnage}
        ></input>
      </STDoctor>
      <STBDIV>
        <STButton type="submit">수정완료</STButton>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          이전으로
        </button>
      </STBDIV>
    </STForm>
  );
};
const STForm = styled.form`
  margin: 2% 0% 5% 15%;
  width: 60%;
  border: 20px solid rgba(212, 186, 210, 0.63);
  border-radius: 25px;
  background-color: rgba(228, 198, 225, 0.233);
  padding: 50px 50px 30px 40px;
  font-family: "GongGothicMedium";
`;
const STTitle = styled.div`
  width: 800px;
  height: 50px;
  margin: 10px 0px 30px 10px;
`;

const STLabel = styled.label`
  font-size: 30px;
  margin-right: 20px;
  color: #3b3737;
`;

const STInput = styled.input`
  width: 80%;
  height: 30px;
`;

const STCategory = styled.div`
  width: 60%;
  height: 30px;
  margin-bottom: 20px;
`;

const STCLabel = styled.label`
  margin-right: 20px;
  font-size: 20px;
`;

const STSelect = styled.select``;

const STImage = styled.div`
  margin-bottom: 20px;
`;

const STImageLabel = styled.label`
  margin-right: 10px;
  font-size: 20px;
`;

const STContent = styled.div`
  width: 100%;
  height: 500px;
`;

const STTextarea = styled.textarea`
  width: 100%;
  height: 500px;
  font-size: 15px;
`;

const STPrice = styled.div`
  height: 30px;
  margin: 30px 0px 15px 0px;
`;

const STPriceLabel = styled.label`
  margin: 0px 10px 0px 10px;
  font-size: 20px;
`;

const STDoctor = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const STInfoLabel = styled.label`
  margin: 0px 10px 0px 10px;
  font-size: 20px;
`;

const STButton = styled.button`
  width: 50px;
  height: 30px;
`;

const STBDIV = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;
export default EditForm;
