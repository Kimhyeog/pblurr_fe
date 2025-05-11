// components/AnalysisCalendar.tsx
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useMemo } from "react";

interface Props {
  dateList: string[]; // 'YYYY-MM-DD' 형식
  selectedDates: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
  onMonthChange: (month: number, year: number) => void; // 연도도 추가
}

function AnalysisCalendar({
  dateList,
  selectedDates,
  setSelectedDates,
  onMonthChange,
}: Props) {
  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // month는 0-based
  };

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const markedDates = useMemo(() => dateList.map(parseDate), [dateList]);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const handleClick = (date: Date) => {
    const dateStr = formatDate(date);

    if (!dateList.includes(dateStr)) return; // 검사받은 날짜가 아니면 무시

    if (selectedDates.includes(dateStr)) {
      setSelectedDates(selectedDates.filter((d) => d !== dateStr));
    } else if (selectedDates.length < 2) {
      setSelectedDates([...selectedDates, dateStr]);
    } else {
      alert("두 개까지만 선택할 수 있습니다.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-3xl shadow-md border max-h-[340px] border-[#DEDCE1] w-full sm:w-auto">
      <Calendar
        onClickDay={handleClick}
        tileContent={({ date }) =>
          markedDates.some((d) => isSameDay(d, date)) ? (
            <div className="flex justify-center mt-1">
              {/* 캘린더 날짜 중 분석결과에 해당되는 날짜 */}
              <div className="w-1.5 h-1.5 bg-[#5CA7C8] rounded-full" />
            </div>
          ) : null
        }
        tileClassName={({ date }) => {
          const dateStr = formatDate(date);
          return selectedDates.includes(dateStr) ? "selected-date" : "";
        }}
        tileDisabled={({ date }) => {
          const dateStr = formatDate(date);
          return !dateList.includes(dateStr);
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            const month = activeStartDate.getMonth() + 1;
            const year = activeStartDate.getFullYear();
            onMonthChange(month, year);
          }
        }}
        className="w-full text-sm [&_.react-calendar]:w-full [&_.react-calendar]:max-w-full"
      />
    </div>
  );
}

export default AnalysisCalendar;
