import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//redux, middleware
import { useDispatch, useSelector } from "react-redux";
import { __signUpUser, __userCheck } from "../redux/modules/userSlice";

//Lottie style
import Lottie from "lottie-react";
import { loginLottie } from "../assets/lottie";

//style
import styled from "styled-components";
import "../shared/Common/Common.css";
import { instance } from "../core/api/axios";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 회원가입/ 로그인 서버로 보내는 데이터 state
  const [username, setUsername] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");


  // 서버에서 온 데이터 상태관리
  const [ localMSG, setLocalMSG ] = useState("")
  const [ localCODE, setLocalCODE ] = useState("")

  // 서버에서 받은 데이터 store에 저장해서 가져온 값. (굳이 리덕스 안써도 될법한 것.)
  const userDubCheck = useSelector((state)=>state.user.userCheck)


  // 아이디, 비밀번호 정규식
  // id:영문-숫자 4,10 , pw:영문,숫자 8-20자
  function isId(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,10}$/g;
    return regExp.test(asValue);
  }
  function isPassword(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
  }

  // 중복체크
  const dupCheck = () => {
    if (!isId(username)) {
      alert("영문과 숫자를 포함하는 4-10자의 이내의 아이디를 입력해주세요");
      return;
    }
    console.log(username);
    dispatch(__userCheck(username));

  }


  // 회원가입
  const goSignIn = () => {
    console.log("회원가입", username, userPw, userPwCheck);
    if (!isPassword(userPw)) {
      console.log(isPassword(userPw));
      alert("대,소문자의 영문과 숫자, 특수문자를 포함하는 8-15자 이내의 비밀번호를 입력해주세요");
      return;
    }
    if (userPw !== userPwCheck) {
      alert("비밀번호를 다시 한번 더 확인하세요");
      return;
    }
    // 중복확인 여부
    if(!userDubCheck){
      console.log('중복확인X')
      return alert("아이디 중복확인을 해주세요")
    } 
    console.log("중복확인pass", userDubCheck);

    // user데이터전송
    const signup_data = {
      username: username,
      password: userPw,
    };


    // 리듀서, middleware 사용안하고 화면단에서 서버통신하네요? 
    // 서버통신할 때 굳이 리듀서 사용을 안해도 되는 거였네요/?흠.

    instance.post("/api/user/signup", signup_data)
    .then((res)=>{
      // console.log(res)
      const signUpMsg = res.data.msg
      const signUpCode = res.data.statusCode
      console.log(signUpMsg,signUpCode)
      if(signUpCode === 200){
        setUsername("");
        setUserPw("");
        setUserPwCheck("");
        alert(signUpMsg)
        navigate("/login");
      }else{
        // alert(signUpMsg)
        setLocalMSG(signUpMsg)
        setLocalCODE(signUpCode)
        return
      }
    })
    .catch((err)=>{
      alert('로그인실패',err)
      console.log(err)
    })
  }



  // signIn T/F로 로그인-회원가입 창 분기함.
  return (
    <Contain>
      <BoxBox>
        <SignupBox>
          <Title>
            <p className="maintit">항해 언니</p>
            <p className="subtit">예뻐지고 싶은 언니들의 커뮤니티</p>
          </Title>
          <Box>
            <p>회원 가입</p>
            <IdBox>
              <div className="signin_box">
                <p>아이디</p>
                <div className="double_btn">
                  <input
                    value={username || ""}
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    onChange={(e) => {
                      // console.log(username)
                      setUsername(e.target.value);
                    }}
                  />
                  <button onClick={dupCheck}>중복확인</button>
                </div>
                <ServerMSG color={userDubCheck? 'green' : 'red' }>
                  { userDubCheck === null ? null : 
                    userDubCheck ? 
                      <span>사용 가능한 아이디입니다</span>
                    :
                      <span>중복된 아이디 입니다</span>
                    }
                </ServerMSG>
              </div>
              <>
                <p>비밀번호</p>
                <input
                  value={userPw || ""}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={(e) => {
                    // console.log(userPw)  
                    setUserPw(e.target.value);
                  }}

                  />
                  {/* 정규식 통과여부 아래 p추가
                  <p>사용가능한 비밀번호입니다</p>
                  <p>비밀번호를 (조건)확인해주세요</p> */}

              </>
              <>
                <p>비밀번호 확인</p>
                <input
                  value={userPwCheck || ""}
                  type="password"
                  placeholder="비밀번호를 한번 더 확인해주세요"
                  onChange={(e) => {
                    // console.log(userPwCheck)
                    setUserPwCheck(e.target.value);
                  }}

                  />
                  <ServerMSG color={localCODE===200? 'green' : 'red'} >
                  { localMSG ? 
                    <span>{localMSG}</span>
                  :
                    <span>{localMSG}</span>
                  }
                  </ServerMSG>
                  {/* 위의 비밀번호랑 맞는지 있다가 추가 */}
                  {/* <p className="warning">비밀번호를 확인해주세요</p>

                  <p className="pass">비밀번호가 일치합니다</p> */}
              </>
            </IdBox>
            <MoveBox>
              <button className="login_btn" onClick={goSignIn}>
                회원가입하기
              </button>
              <p
                onClick={() => {
                  navigate("/login");
                }}
              >
                이미 회원이신가요?
              </p>
            </MoveBox>
          </Box>
        </SignupBox>
        <ImgBox>
          <Lottie animationData={loginLottie} />
        </ImgBox>
      </BoxBox>
    </Contain>
  );
};

const Contain = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffec99;
  /* background-color: #fff3bf; */
  /* background-color: #e5dbff; */
`;
const BoxBox = styled.div`
  position: relative;
  width: 1400px;
  height: 900px;
  margin: 0 auto;
  /* border: 1px solid red; */
`;
const SignupBox = styled.div`
  position: absolute;
  z-index: 10;
  top: 20%;
  left: 7%;
  /* transform: translate(-50%, -50%); */
`;
const ImgBox = styled.div`
  width: 900px;
  height: 700px;
  position: absolute;
  /* top: 2%; */
  left: 35%;
`;
const Title = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-family: "GongGothicMedium";
  font-style: oblique;
  .maintit {
    font-size: 65px;
    margin-bottom: 10px;
  }
  .subtit {
    font-size: 30px;
  }
`;
const Box = styled.div`
  width: 550px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 3px gray;
  font-family: "GongGothicMedium";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  p {
    font-size: 25px;
    margin: 10px 0 30px;
  }
`;
const IdBox = styled.div`
  width: 100%;
  p {
    font-size: 18px;
    margin: 10px 0 5px 0;
  }
  input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding-left: 15px;
    box-sizing: border-box;
    margin-bottom: 5px;
    border: 1px solid #74c0fc;
  }
  .double_btn {
    display: flex;
    button {
      width: 100px;
      height: 40px;
    }
  }
`;
const MoveBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  button {
    margin: 15px 0 10px;
    height: 35px;
    width: 40%;
    cursor: pointer;
  }
  p {
    cursor: pointer;
    font-size: 16px;
  }
`;

//server Msg
const ServerMSG = styled.div`

  color : ${(props)=> props.color };
  font-size : 14px;
  margin: 0 0 15px 5px;

`


export default SignUp;
