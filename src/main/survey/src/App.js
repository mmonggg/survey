import './App.css';
import axios from "axios";

function App() {
  // const selectData = () => {
  //   axios.post('/testData', ['a', 'b'])
  //       .then((res) => console.log(res));
  // }

  const closeAgree =(e) => {
      let agree = document.querySelector(".content");
      let chkBox = document.getElementById("agreeChk");
      if(chkBox.checked) {
          agree.style.display = "none";
      } else {
          alert("동의해야함");
      }
  }

  return (
      <div className="App">
          <div className="content">
              <p className="agreeCheck pCenter">개인정보 수집이용 동의</p>
              <table className="agree">
                  <tr>
                      <th>수집항목</th>
                      <td>사업장/성별/연령</td>
                  </tr>
                  <tr>
                      <th>수집목적</th>
                      <td>사내식당 만족도 파악을 통한 식사품질 개선 목적</td>
                  </tr>
                  <tr>
                      <th>보유기간</th>
                      <td>2023-12-04 ~ 2024-12-19</td>
                  </tr>
              </table>

              <p className="comments">귀하께서는 위 수집·이용에 대한 동의를 거부하실 수 있으나, 이는 설문조사 대상자로 참여하기 위해 필수적으로 제공되어야 하는 정보이므로,</p>
              <p className="comments">동의를 거부하실 경우 본 설문에 참여하실 수 없습니다.</p>

              <p className="agreeCheckBox pCenter"><input id="agreeChk"  type="checkbox"/> 개인정보 수집 및 이용에 동의합니다.(필수)</p>

              <p className="pCenter"><button className="close" onClick={() => closeAgree()}>닫기</button></p>

          </div>
      </div>

  );
}

export default App;
