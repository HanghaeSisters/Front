import { Carousel } from "antd";
import styled from "styled-components";

function Banner() {
  return (
    <STCarousel>
      <Carousel autoplay>
        <div>
          <img src="/image/banner 1.jpg" alt="" />
        </div>
        <div>
          <img src="/image/banner 2.jpg" alt="" />
        </div>
        <div>
          <img src="/image/banner5.jpg" alt="" />
        </div>
      </Carousel>
    </STCarousel>
  );
}
const STCarousel = styled.div`
  justify-content: center;
`;

export default Banner;
