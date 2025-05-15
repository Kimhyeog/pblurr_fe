import { useMemo, useState } from "react";
import { compareSkinAnalysisResults } from "@/api/skinAnalysisCompare";
import { SkinAnalysisCompareResponse } from "@/types/types";
import AnalysisCalendar from "./AnalysisCalendar";

interface Props {
  dateList: string[];
  selectedDates: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
  setCompareResult: React.Dispatch<
    React.SetStateAction<SkinAnalysisCompareResponse | null>
  >;
  setLoading: (loading: boolean) => void;
}

function AnalysisDateList(props: Props) {
  const {
    dateList,
    selectedDates,
    setSelectedDates,
    setCompareResult,
    setLoading,
  } = props;
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  // 현재 월과 연도를 모두 고려해서 필터링
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const filteredDateList = useMemo(() => {
    return dateList.filter((dateStr) => {
      const date = new Date(dateStr);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return month === currentMonth && year === currentYear;
    });
  }, [dateList, currentMonth, currentYear]);
  // 현재 월과 연도를 모두 고려 정렬되도록 하는 구현부

  const sortedDateList = useMemo(() => {
    const sorted = [...filteredDateList].sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b).getTime() - new Date(a).getTime()
        : new Date(a).getTime() - new Date(b).getTime()
    );
    return sorted;
  }, [filteredDateList, sortOrder]);

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else if (selectedDates.length < 2) {
      setSelectedDates([...selectedDates, date]);
    } else {
      alert("두 개까지만 선택할 수 있습니다.");
    }
  };

  const handleCompare = async () => {
    if (selectedDates.length !== 2) {
      alert("날짜를 두 개 선택해주세요.");
      return;
    }
    setLoading(true);

    try {
      const result = await compareSkinAnalysisResults(
        selectedDates[0],
        selectedDates[1]
      );
      setCompareResult(result);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="w-full flex flex-col sm:flex-row items-center gap-x-3">
        {/* 날짜 리스트 - 데스크탑 이상에서만 보임 */}
        <ul className="hidden sm:flex h-full flex-1 flex-col text-center gap-2">
          <div className="flex justify-between items-center py-2 px-4 mb-2 rounded-lg bg-[#FFFFFF] font-bold text-xl border-2 text-[#5CA7C8] border-[#3C9FCA]">
            <h1>분석 날짜 목록</h1>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "latest" | "oldest")
              }
              className="ml-2 px-2 py-1 text-sm border border-[#3C9FCA] rounded-md text-[#3C9FCA] bg-white"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2 max-h-[340px] h-full overflow-y-auto">
            {sortedDateList.length === 0 ? (
              <div className="flex items-center justify-center h-full py-10 text-center text-lg bg-white text-gray-500 border border-gray-300 rounded-2xl">
                {currentMonth}월에는 피부 미용 분석을 받은 기록이 없습니다.
              </div>
            ) : (
              sortedDateList.map((date) => (
                <li
                  key={date}
                  onClick={() => toggleDate(date)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border transition-colors duration-200
                ${
                  selectedDates.includes(date)
                    ? "bg-[#5CA7C8] text-white border-[#3C9FCA]"
                    : "bg-white hover:bg-[#f0f9fb] border-gray-300"
                }`}
                >
                  {date}
                </li>
              ))
            )}
          </div>
        </ul>

        {/* ✅ 캘린더 - 모든 해상도에서 보임 */}
        <div className="w-full sm:w-auto">
          <h1 className="w-full text-center py-2 px-4 mb-2 rounded-lg bg-[#FFFFFF] font-bold text-xl border-2 text-[#5CA7C8] border-[#3C9FCA]">
            캘린더
          </h1>
          <AnalysisCalendar
            dateList={dateList}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            onMonthChange={(month, year) => {
              setCurrentMonth(month);
              setCurrentYear(year);
            }}
          />
        </div>
      </div>

      {/* ✅ 비교하기 버튼 - 모바일에서만 보이도록 설정 */}
      <div className="w-full my-4 sm:hidden">
        <button
          onClick={handleCompare}
          disabled={selectedDates.length !== 2}
          className="py-3 w-full bg-[#3C9FCA] text-xl hover:bg-[#338bb2] text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          비교하기
        </button>
      </div>

      {/* ✅ 비교 버튼 - 데스크탑에서만 보이도록 원래 위치 유지 */}
      <div className="w-full my-4 hidden sm:block">
        <button
          onClick={handleCompare}
          disabled={selectedDates.length !== 2}
          className="py-3 w-full bg-[#3C9FCA] text-xl hover:bg-[#338bb2] text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          비교하기
        </button>
      </div>
    </div>
  );
}

export default AnalysisDateList;
