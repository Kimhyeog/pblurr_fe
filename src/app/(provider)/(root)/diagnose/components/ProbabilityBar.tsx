import { useEffect, useState } from "react";
import styled from "styled-components";

interface ProbabilityBarProps {
  percent: string; // "97%" 이런 문자열
}

interface IProgress {
  $width: number;
  $backgroundColor: string;
}

const ProgressBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #dedede;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 20px;
  overflow: hidden;
`;

const Progress = styled.div<IProgress>`
  width: ${(props) => props.$width}%;
  height: 30px;
  text-align: center;
  background-color: ${(props) => props.$backgroundColor};
  color: #111;
  transition: width 0.1s ease, background-color 0.3s ease;
`;

function ProbabilityBar({ percent }: ProbabilityBarProps) {
  const numericPercent = parseFloat(percent.replace("%", ""));
  const targetPercent = isNaN(numericPercent)
    ? 0
    : Math.min(Math.max(numericPercent, 0), 100);

  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    const duration = 2000; // 총 2초
    const stepTime = duration / targetPercent; // 한 번 업데이트할 때마다 걸리는 시간

    const interval = setInterval(() => {
      setCurrentPercent((prev) => {
        if (prev < targetPercent) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return targetPercent;
        }
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [targetPercent]);

  let backgroundColor = "skyblue";
  if (currentPercent > 70) {
    backgroundColor = "red";
  } else if (currentPercent > 30) {
    backgroundColor = "yellow";
  }

  return (
    <ProgressBar>
      <Progress $width={currentPercent} $backgroundColor={backgroundColor} />
    </ProgressBar>
  );
}

export default ProbabilityBar;
