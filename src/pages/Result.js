import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "../styles/Result.css";
import blackboardEraser from "../images/blackboardEraser.png";
import testImage from "../images/test.jpg";
import BlackboardGraffiti from "../images/Blackboard-graffiti.png"; 
import { useToggle } from "../ToggleContext";

const Result = () => {
  const { toggle } = useToggle();
  
  // State for image URL and results (dummy data used as placeholders)
  const [imageUrl, setImageUrl] = useState(testImage); // 기본 이미지 설정
  const [fileName, setFileName] = useState(""); // 파일명 상태 추가
  const [results, setResults] = useState([]); // 분석 결과 리스트 (예제)

  // If fileName exists, update imageUrl
  useEffect(() => {
    if (fileName) {
      setImageUrl(fileName);
    }
  }, [fileName]);

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

  const handleSaveAsPNG = () => {
    const element = document.querySelector('.result-container');
  
    const buttons = document.querySelectorAll('.result-actions, .back-button');
    buttons.forEach(button => button.style.display = 'none');
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'result.png';
      link.click();
  
      buttons.forEach(button => button.style.display = '');
    });
  };  

  return (
    <div className="result-container">
      <div className="result-header">
        <p>분석 결과</p>
        <button className="back-button" onClick={toggle}>
          다시하기
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
  );
};

export default Result;
