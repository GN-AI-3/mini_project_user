import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName, results } = location.state || {};

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
    <div className="result-container">
      <div className="result-header">
        <h1>분석 결과</h1>
        <button className="back-button" onClick={() => navigate("/")}>
          새 분석 시작하기
        </button>
      </div>

      <div className="result-info">
        <p>
          <strong>파일명:</strong> {fileName}
        </p>
      </div>

      <div className="result-card">
        <h2>요약</h2>
        <div className="result-content">
          <p>{results.summary}</p>
        </div>
      </div>

      <div className="result-card">
        <h2>상세 분석</h2>
        <div className="result-content">
          <ul>
            {results.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="result-card">
        <h2>추천 사항</h2>
        <div className="result-content">
          <ul>
            {results.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="result-actions">
        <button className="action-button">PDF로 저장</button>
        <button className="action-button">분석 결과 공유</button>
      </div>
    </div>
  );
};

export default Result;
