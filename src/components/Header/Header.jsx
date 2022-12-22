import styled from "styled-components";
import Lottie from "lottie-react";
import face from "../../assets/lottie/face.json";

import { deleteCookie, getCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const cookie = getCookie("is_login");

  const deleteCookiehandler = () => {
    deleteCookie("is_login");
    navigate("/");
  };

  return (
    <STNavbar>
      <STInner>
        <div className="logo">
          <a href="/" className="logo">
            <Lottie animationData={face} />
          </a>
        </div>
        <a href="/" className="logo">
          <div className="title">항해언니</div>
        </a>
        {cookie ? (
          <ul className="menu">
            <li>
              <div className="logOut" onClick={deleteCookiehandler}>
                로그아웃
              </div>
            </li>
            <li>
              <a href="/postingPage">글 작성</a>
            </li>
          </ul>
        ) : (
          <ul className="menu">
            <li>
              <a href="/logIn">로그인</a>
            </li>
            <li>
              <a href="/signUp">회원가입</a>
            </li>
          </ul>
        )}
      </STInner>
    </STNavbar>
  );
}

const STNavbar = styled.header`
  width: 100%;
  height: 80px;
  background-color: #e7a0be8f;
  font-family: "GongGothicMedium";
`;

const STInner = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  a {
    text-decoration-line: none;
    div.title {
      margin: 40px 1600px 0px 0px;
      font-size: 25px;

      color: #ffffff;
    }
  }

  div.logo {
    width: 80px;
    height: 80px;
    margin: 0px 0px 5px 7px;
  }
  ul {
    display: flex;
    margin: 35px 20px 0px 0px;
    list-style: none;
    display: flex;
    li {
      display: flex;
      div {
        padding: 13px 15px;
        display: block;
        font-size: 13px;
        color: #000000;
        cursor: pointer;
        &:hover {
          background-color: #f551e76a;
          color: #ffffff;
        }
      }
      a {
        padding: 13px 15px;
        display: block;
        font-size: 13px;
        color: #000000;
        text-decoration: none;
        &:hover {
          background-color: #f551e76a;
          color: #ffffff;
        }
      }
    }
  }
`;

export default Header;
