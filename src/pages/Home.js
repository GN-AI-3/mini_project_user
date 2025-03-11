import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const navigate = useNavigate();

  // 컴포넌트가 언마운트될 때 interval 정리
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("PDF 파일만 업로드 가능합니다.");
      e.target.value = null;
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);

        // 파일 input 엘리먼트에도 파일 설정
        // 이는 새로운 DataTransfer 객체를 생성하고 파일을 추가한 다음,
        // 그것을 input 엘리먼트의 files 속성에 할당하는 방식으로 작동합니다
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        fileInputRef.current.files = dataTransfer.files;
      } else {
        alert("PDF 파일만 업로드 가능합니다.");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const startProgressSimulation = () => {
    setProgress(0);

    // 프로그레스 바를 시뮬레이션하기 위한 인터벌 설정
    // 실제 API에서는 진행 상황을 받아와서 업데이트해야 합니다
    const simulateProgress = () => {
      setProgress((prevProgress) => {
        // 현재 진행 상태에 따라 증가 속도 조절
        let increment;
        if (prevProgress < 30) {
          increment = 3; // 초기에는 빠르게
        } else if (prevProgress < 60) {
          increment = 2; // 중간은 보통 속도
        } else if (prevProgress < 85) {
          increment = 1; // 후반에는 느리게
        } else {
          increment = 0.5; // 마지막은 아주 느리게
        }

        // 95%까지만 진행 (100%는 완료 시에만)
        return Math.min(prevProgress + increment, 95);
      });
    };

    // 50ms마다 진행 상태 업데이트
    progressIntervalRef.current = setInterval(simulateProgress, 50);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("PDF 파일을 업로드해주세요.");
      return;
    }

    setLoading(true);
    startProgressSimulation();

    // 여기서 파일 업로드 및 분석 API 호출 로직을 구현할 수 있습니다.
    // 예시 코드:
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 백엔드 API 호출 (실제 엔드포인트로 변경 필요)
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      // 실제 API 연동 시 주석 해제하고 아래 코드는 제거
      setTimeout(() => {
        // 타이머 정리
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }

        // 분석 완료 표시
        setProgress(100);

        // 약간의 지연 후 결과 페이지로 이동
        setTimeout(() => {
          setLoading(false);
          // 분석 결과 페이지로 이동
          navigate("/result", {
            state: {
              fileName: file.name,
              // 테스트용 더미 데이터
              results: {
                summary: "학생기록부 분석 결과입니다.",
                details: ["활동내역 1", "활동내역 2", "활동내역 3"],
                recommendations: ["추천사항 1", "추천사항 2"],
              },
            },
          });
        }, 500);
      }, 2000); // 테스트를 위한 2초 지연
    } catch (error) {
      console.error("분석 중 오류 발생:", error);

      // 타이머 정리
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      setLoading(false);
      setProgress(0);
      alert("분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="home-container">
      <h1 className="main-title">학생기록부 분석 시스템</h1>
      <div className="instructions">
        <p className="instruction-text">
          <span className="instruction-icon">ℹ️</span>
          <strong>사용 안내:</strong> PDF 형식의 학생기록부 파일을 업로드하여
          분석할 수 있습니다.
          <br />
          <span className="warning-text">
            ※ 학생기록부 외에 다른 PDF 파일을 올릴 경우, 원하는 결과값이 나오지
            않을 수 있습니다.
          </span>
        </p>
      </div>
      <div className="upload-form">
        <form onSubmit={handleAnalyze} onDragEnter={handleDrag}>
          <div
            className={`file-upload-area ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              id="pdf-upload"
              accept="application/pdf"
              onChange={handleFileChange}
              className="file-input"
              required={!file} // 파일이 이미 선택되어 있으면 required 속성을 false로 설정
            />

            <div className="upload-content">
              <button
                type="button"
                className="upload-button"
                onClick={handleButtonClick}
              >
                <span className="plus-icon">+</span> PDF로 시작
              </button>
              <p className="drag-text">또는 여기에 PDF 파일 끌어다 놓기</p>
            </div>

            {file && (
              <div className="selected-file">
                <div className="file-badge">
                  <svg
                    className="file-icon"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                      fill="#4B0AFF"
                    />
                    <path
                      d="M12,17.5A1.5,1.5 0 0,1 10.5,16A1.5,1.5 0 0,1 12,14.5A1.5,1.5 0 0,1 13.5,16A1.5,1.5 0 0,1 12,17.5M12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10M12,13.75A1.5,1.5 0 0,1 10.5,12.25A1.5,1.5 0 0,1 12,10.75A1.5,1.5 0 0,1 13.5,12.25A1.5,1.5 0 0,1 12,13.75Z"
                      fill="#4B0AFF"
                    />
                  </svg>
                  <span className="selected-file-name">{file.name}</span>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => {
                      setFile(null);
                      fileInputRef.current.value = "";
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="analyze-button"
            disabled={!file || loading}
          >
            {loading ? "분석 중..." : "분석 시작하기"}
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p className="loading-text">학생기록부를 분석 중입니다...</p>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{Math.round(progress)}% 완료</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
