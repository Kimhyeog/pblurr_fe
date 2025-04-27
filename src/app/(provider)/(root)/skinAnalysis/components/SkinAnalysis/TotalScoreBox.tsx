import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  totalWrinkle: number;
  totalPigmentation: number;
  totalPore: number;
}

function TotalScoreBox(props: Props) {
  const { totalWrinkle, totalPigmentation, totalPore } = props;

  const maxValues = {
    주름: 26,
    색소침착: 15,
    모공: 10,
  };

  const recommendedValues = {
    주름: 13,
    색소침착: 7,
    모공: 5,
  };

  const pieData = [
    {
      name: "주름",
      value: totalWrinkle,
      remaining: maxValues["주름"] - totalWrinkle,
      max: maxValues["주름"],
      recommended: recommendedValues["주름"],
      fill: "#7FC5E0",
    },
    {
      name: "색소침착",
      value: totalPigmentation,
      remaining: maxValues["색소침착"] - totalPigmentation,
      max: maxValues["색소침착"],
      recommended: recommendedValues["색소침착"],
      fill: "#FBBF24",
    },
    {
      name: "모공",
      value: totalPore,
      remaining: maxValues["모공"] - totalPore,
      max: maxValues["모공"],
      recommended: recommendedValues["모공"],
      fill: "#F87171",
    },
  ];

  return (
    <div className="w-full bg-white border border-[#DEDCE1] rounded-2xl shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pieData.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: item.name, value: item.value, fill: item.fill },
                    {
                      name: "남은 범위",
                      value: item.remaining,
                      fill: "#E5E7EB",
                    },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  cornerRadius={20}
                  startAngle={90}
                  endAngle={-270}
                >
                  {[
                    <Cell key="score" fill={item.fill} />,
                    <Cell key="remaining" fill="#E5E7EB" />,
                  ]}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* 도넛 중앙 점수 */}
            <div className="absolute top-[85px] text-center">
              <p className="text-xl font-bold text-[#3B6F82]">{item.value}</p>
              <p className="text-sm text-gray-500">/{item.max}</p>
            </div>

            {/* 설명 텍스트 */}
            <div className="mt-2 text-md text-center">
              <p
                className={`min-w-[80px] font-bold rounded-2xl px-2 py-1 text-white mt-2`}
                style={{ backgroundColor: item.fill }} // 동적으로 색상 적용
              >
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TotalScoreBox;
