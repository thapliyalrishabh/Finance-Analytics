import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Line,
  Legend,
  LineChart,
  BarChart,
  Bar,
} from 'recharts';
import BoxHeader from '@/components/BoxHeader';

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  // Helper function to capitalize first letter of word
  const capitalizeFirstWord = (word: string) => {
    return word.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
      letter.toUpperCase()
    );
  };
  // Data for Chart 1 - a
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: capitalizeFirstWord(month.substring(0, 3)),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);
  // Data for Chart 2 - b
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: capitalizeFirstWord(month.substring(0, 3)),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

  // Data for Chart 3 - c
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: capitalizeFirstWord(month.substring(0, 3)),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  // Custom Tooltip

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div
  //         className="custom-tooltip"
  //         style={{
  //           display: 'inline-block',
  //           padding: 10,
  //           color: 'white',
  //         }}
  //       >
  //         <p className="label">{label}</p>
  //         <p style={{ color: 'white' }}>{`Revenue: ${payload[0].value}`}</p>
  //         <p style={{ color: 'white' }}>{`Expenses: ${payload[1].value}`}</p>
  //       </div>
  //     );
  //   }
  // };

  return (
    <>
      {/*  First Chart - a */}
      <DashboardBox gridArea="a" overflow="hidden">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represents Revenue, bottom line represents Expenses"
          sideText="+7%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[600]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[800]}
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: '0px' }}
              style={{ fontSize: '10px' }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            {/* <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            /> */}
            <Area
              name="Expenses"
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              name="Revenue"
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.tertiary[400]}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* ------------------------------------------------------- */}
      {/* Second Chart - b */}
      <DashboardBox gridArea="b" overflow="hidden">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Top line represents Revenue, bottom line represents Expenses"
          sideText="+8%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: '0 0 10px 0 ',
              }}
            />
            <Line
              name="Profit"
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[900]}
            />
            <Line
              name="Revenue"
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* ------------------------------------------------------- */}
      {/* Third Chart - c */}
      <DashboardBox gridArea="c" overflow="hidden">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="Bar graph representing revenue month by month"
          sideText="+5%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenueBar" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip />
            <Bar
              name="Revenue"
              dataKey="revenue"
              fill="url(#colorRevenueBar)"
              stroke={palette.primary.light}
            />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
