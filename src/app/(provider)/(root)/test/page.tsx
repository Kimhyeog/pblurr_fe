import styled from "styled-components";

interface ProbabilityBarProps {
  percent: string; // "32%" 같은 문자열
}

interface IProgress {
  width: number;
  backgroundColor: string;
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
  width: ${(props) => props.width}%;
  height: 30px;
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
  color: #111;
  transition: width 0.3s ease, background-color 0.3s ease;
`;

function ProbabilityBar({ percent }: ProbabilityBarProps) {
  // 문자열에서 '%' 제거하고 숫자로 변환
  const numericPercent = parseFloat(percent.replace("%", ""));

  // 변환 실패하거나 범위 벗어나면 0으로 처리
  const validPercent = isNaN(numericPercent)
    ? 0
    : Math.min(Math.max(numericPercent, 0), 100);

  // 퍼센트 범위에 따라 색상 결정
  let backgroundColor = "skyblue"; // 기본
  if (validPercent > 70) {
    backgroundColor = "red";
  } else if (validPercent > 30) {
    backgroundColor = "yellow";
  }

  return (
    <ProgressBar>
      <Progress width={validPercent} backgroundColor={backgroundColor} />
    </ProgressBar>
  );
}

export default ProbabilityBar;
