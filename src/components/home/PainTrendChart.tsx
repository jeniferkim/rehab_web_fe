// src/components/home/PainTrendChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PainTrendItem = {
  dateLabel: string;   // "11/28" 이런 식으로 표시용 라벨
  painBefore: number;  // 운동 전 통증
  painAfter: number;   // 운동 후 통증
};

// 데모용 mock 데이터 (원하는 대로 수정해도 됨)
const MOCK_PAIN_TREND: PainTrendItem[] = [
  { dateLabel: "11/28", painBefore: 6, painAfter: 4 },
  { dateLabel: "11/29", painBefore: 5, painAfter: 3 },
  { dateLabel: "11/30", painBefore: 5, painAfter: 2 },
  { dateLabel: "12/01", painBefore: 4, painAfter: 2 },
  { dateLabel: "12/02", painBefore: 4, painAfter: 1 },
  { dateLabel: "12/03", painBefore: 3, painAfter: 1 },
  { dateLabel: "12/04", painBefore: 3, painAfter: 0 },
];

export const PainTrendChart = () => {
  return (
    <div className="h-40 w-full rounded-2xl bg-gray-50 px-3 py-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={MOCK_PAIN_TREND}
          barCategoryGap={16}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 10]} // 통증 0~10 스케일 기준
          />
          <Tooltip
            formatter={(value: number) => `${value}점`}
            labelFormatter={(label) => `${label} 통증`}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
            verticalAlign="top"
            height={24}
          />
          <Bar
            dataKey="painBefore"
            name="운동 전 통증"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="painAfter"
            name="운동 후 통증"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
