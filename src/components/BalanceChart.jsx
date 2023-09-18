import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import FlexBetween from "./FlexBetween";

const BalanceChart = () => {
  const { palette } = useTheme();
  const alt = palette.background.alt;
  const dark = palette.neutral.dark;
  const incomeByDateRange = useSelector((state) => state.totals.incomeByDateRange)
  const expensesByDateRange = useSelector((state) => state.totals.expensesByDateRange)
  const arr = [];
  for (const dateRange in incomeByDateRange) {
    if (incomeByDateRange.hasOwnProperty(dateRange)) {

      const income = incomeByDateRange[dateRange];
      const expenses = expensesByDateRange[dateRange];

      arr.push({
        name: dateRange,
        expenses: expenses,
        income: income,
      });
    }
  }
  console.log(arr);

  const data = useMemo(() => {
    return (
      arr &&
      arr.map(({ name, expenses, income }) => {
        return {
          name,
          expenses,
          income
        };
      })
    )
  }, [incomeByDateRange, expensesByDateRange]);

  return (
    <Box sx={{ width: '750px', height: '325px', backgroundColor: alt, borderRadius: "0.75rem", marginLeft: '1rem' }}>
      <FlexBetween color={palette.grey[400]} margin="0rem 1rem 0rem">
        <FlexBetween>
          <Box width="100%" m={'1rem'}>
            <Typography variant='h4'
              color={dark}
              fontWeight='500'>
              Incomes and expenses by week
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="75%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" style={{ fontSize: "10px" }} />
          <YAxis tickFormatter={(v) => `$${v / 1000}k`} style={{ fontSize: "10px" }} />
          {/* <Tooltip /> */}
          <Legend align="right" verticalAlign="top" />
          <Bar dataKey="income" fill="#00D5FA" width={'30px'} />
          <Bar dataKey="expenses" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box >
  );
};

export default BalanceChart;