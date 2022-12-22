import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getHospital, __postPost } from "../../redux/modules/postSlice";
import styled from "styled-components";
import { MdLaptopWindows } from "react-icons/md";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHospitalChk, setIsHospitalChk] = useState(false);
  const [post, setPost] = useState({
    title: "",
    category: "",
    imageBefore: "",
    imageAfter: "",
    content: "",
    price: "",
    hospitalAddress: "",
    doctor: "",
  });

  const hospitalChk = useSelector((state) => state.post.hospitalCheck);
  console.log(hospitalChk);

  const hospitalCheckHandler = () => {
    dispatch(__getHospital(post.hospitalAddress));
    hospitalChk ? setIsHospitalChk(true) : setIsHospitalChk(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (post.title === "") {
      alert("제목을 입력해주세요");
    } else if (post.category === "") {
      alert("카테고리를 선택해주세요!");
    } else if (post.content === "") {
      alert("내용을 입력해주세요!");
    } else if (hospitalChk === false) {
      alert("병원명 확인을 진행해주세요!");
    } else {
      dispatch(__postPost(post));
      window.location.href = "/";
    }
  };

  return (
    <STForm onSubmit={onSubmitHandler}>
      <STTitle>
        <STLabel>제목</STLabel>
        <STInput
          type="text"
          maxLength={"15"}
          onChange={(e) => {
            const { value } = e.target;
            setPost({ ...post, title: value });
          }}
        />
      </STTitle>
      <STCategory>
        <STCLabel>수술부위</STCLabel>
        <STSelect
          onChange={(e) => {
            const { value } = e.target;
            setPost({ ...post, category: value });
          }}
        >
          <option value="" defaultValue>
            카테고리를 선택해주세요
          </option>
          <option value="눈성형">눈성형</option>
          <option value="코성형">코성형</option>
          <option value="턱성형">턱성형</option>
          <option value="지방흡입">지방흡입</option>
        </STSelect>
      </STCategory>
      <STDoctor>
        <div className="hospital-info">
          <STInfoLabel>병원이름</STInfoLabel>
          <input
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, hospitalAddress: value });
            }}
            placeholder="병원이름을 정확히 기재해주세요!"
          ></input>
          <button type="button" onClick={hospitalCheckHandler}>
            확인{" "}
          </button>
        </div>
        <div className="doctor-info">
          <STInfoLabel>원장님 성함</STInfoLabel>
          <input
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, doctor: value });
            }}
          ></input>
        </div>
      </STDoctor>
      {isHospitalChk ? (
        <p style={{ color: "green" }}>확인되었습니다!</p>
      ) : (
        <p style={{ color: "red" }}>병원명을 확인해주세요 </p>
      )}
      {/* 버튼을 두번눌러야 합니다.. 비동기처리 못했읍니다..죄송합니다 */}
      <STImage>
        <STImageLabel>전</STImageLabel>
        <input
          type="url"
          placeholder="성형전 이미지url을 입력해주세요"
          onChange={(e) => {
            const { value } = e.target;
            setPost({ ...post, imageBefore: value });
          }}
        />
        <STImageLabel>후</STImageLabel>
        <input
          type="url"
          placeholder="성형후 이미지url을 입력해주세요"
          onChange={(e) => {
            const { value } = e.target;
            setPost({ ...post, imageAfter: value });
          }}
        />
      </STImage>
      <STContent>
        <STTextarea
          type="text"
          onChange={(e) => {
            const { value } = e.target;
            setPost({ ...post, content: value });
          }}
        />
      </STContent>
      <STPrice>
        <STPriceLabel>시술 비용</STPriceLabel>
        <input
          style={{ fontSize: "bold" }}
          onChange={(e) => {
            const { value } = e.target;
            setPost({ ...post, price: value });
          }}
        />
        <STPriceLabel> 원</STPriceLabel>
      </STPrice>

      <STBDIV>
        <STButton type="submit">완료</STButton>
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
  p {
    margin: 0px 0px 15px 100px;
  }
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
  margin: 0px 0px 15px 10px;
`;

const STCLabel = styled.label`
  margin-right: 20px;
  font-size: 20px;
`;

const STSelect = styled.select``;

const STImage = styled.div`
  margin: 0px 0px 20px 10px;
  input {
    width: 250px;
    margin-right: 15px;
  }
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
  margin-bottom: 10px;
  display: flex;
  div {
    input {
      margin-top: 10px;
      width: 200px;
    }
    button {
      margin-left: 10px;
    }
  }
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

export default Form;
