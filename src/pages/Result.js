import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";  // html2canvas 임포트
import "../styles/Result.css";
import blackboardEraser from "../images/blackboardEraser.png"; // 이미지 import
import testImage from "../images/ppp.png"; // 이미지 import

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation(); // navigate에서 전달된 state를 받기 위한 useLocation 훅 사용

  const [imageUrl, setImageUrl] = useState(null); // 이미지 URL 상태 관리
  const { fileName, results } = location.state || {}; // 전달된 state 데이터

  // useEffect is always called, just apply the logic conditionally inside
  useEffect(() => {
    if (fileName) {
      // 이미지를 설정
      //  setImageUrl(fileName);
      setImageUrl(testImage); // 예시로 testImage를 사용
    }
  }, [fileName]); // fileName 변경될 때마다 실행됩니다.

  // 클립보드에 이미지 URL 복사하기
  const handleCopyImageUrl = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl).then(() => {
        alert("이미지 URL이 클립보드에 복사되었습니다!");
      }).catch(err => {
        console.error("클립보드 복사 실패: ", err);
      });
    }
  };

  // PNG로 저장하는 함수
  const handleSaveAsPNG = () => {
    // 캡처할 요소를 지정
    const element = document.querySelector('.result-container'); 

    // html2canvas로 캡처 후 PNG로 저장
    html2canvas(element).then((canvas) => {
      // canvas를 PNG 이미지로 변환
      const imgData = canvas.toDataURL("image/png");

      // 이미지 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'result.png'; // 파일명 지정
      link.click(); // 다운로드 실행
    });
  };

  // 데이터가 없는 경우 홈으로 리다이렉트
  if (!results) {
    return (
      <div className="no-data">
        <h2>분석 결과가 없습니다.</h2>
        <p>분석을 먼저 진행해주세요.</p>
        <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="result">
      <p className="noisy-person-text">떠든 사람 : ㅁㅁㅁ</p>
      <p className="pranksters-person-text">장난친 사람 : ㅁㅁㅁ</p>
      <img className="blackboardEraser-img" src={blackboardEraser} alt="My Image" />
      
      <div className="result-container">
        <div className="result-header">
          <h1>분석 결과</h1>
          <button className="back-button" onClick={() => navigate("/")}>
            새 분석 시작하기
          </button>
        </div>

        {imageUrl ? (
          <img src={imageUrl} alt="Processed Result" className="result-image" />
        ) : (
          <p>이미지 로드 실패</p>
        )}

        <div className="result-actions">
          <button className="action-button" onClick={handleSaveAsPNG}>
            PNG로 저장
          </button>
          <button className="action-button" onClick={handleCopyImageUrl}>
            이미지 URL 복사
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
