import styled from "styled-components";
import Lottie from "lottie-react";
import github2 from "../../assets/lottie/github2.json";
function Footer() {
  return (
    <STFooter>
      <div className="inner">
        <div className="backEnd">
          <h2>SPRING</h2>
          <img src="/img/icons8-봄-로고-40.png" alt="spring" />
          <ul>
            <li>
              KyuMin
              <a href="https://github.com/starMinK">
                https://github.com/starMinK
              </a>
            </li>
            <li>
              Sora
              <a href="https://github.com/dev-rara">
                https://github.com/dev-rara
              </a>
            </li>
            <li>
              ChumBaek
              <a href="https://github.com/civilcoy">
                https://github.com/civilcoy
              </a>
            </li>
          </ul>
        </div>
        <div className="github">
          <Lottie animationData={github2} />
        </div>
        <div className="frontEnd">
          <h2>REACT</h2>
          <img src="/img/icons8-반응하다-80.png" alt="spring" />
          <ul>
            <li>
              SoYoung
              <a href="https://github.com/thdud2262">
                https://github.com/thdud2262
              </a>
            </li>
            <li>
              JinYoung
              <a href="https://github.com/jyk2022">
                https://github.com/jyk2022
              </a>
            </li>
            <li>
              SooMin
              <a href="https://github.com/soomin-world">
                https://github.com/soomin-world
              </a>
            </li>
          </ul>
        </div>
      </div>
    </STFooter>
  );
}

const STFooter = styled.footer`
  background-color: #d85d9061;
  width: 100%;
  height: 230px;
  padding: 10px;
  font-family: "GongGothicMedium";
  div {
    margin: 20px 0px 0px 15px;
    display: flex;
    justify-content: center;
    gap: 70px;
    div {
      h2 {
        margin: 50px 10px 0px 0px;
        font-size: 40px;
        font-weight: bold;
        color: #ffffff;
      }
      img {
        margin: 30px 20px 0px 0px;
        width: 80px;
        height: 80px;
      }
      ul {
        width: 500px;

        list-style: none;
        justify-content: center;
        li {
          margin: 10px 30px 30px 10px;
          font-size: 25px;
          font-weight: bold;
          color: #ffffff;
          a {
            text-decoration-line: none;
            margin-left: 20px;
            font-size: 15px;
            color: #07070792;
          }
        }
      }
    }
  }
`;

// 백 , 프론트 나눠서 각각 깃허브 주소 연결시키
export default Footer;
