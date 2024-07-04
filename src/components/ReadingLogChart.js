import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const ReadingLogChart = ({ logs }) => {
  const chartData = logs.map(log => ({
    date: new Date(log.date).toLocaleDateString(),
    pages: log.pages_read,
    minutes: log.minutes_read
  }));

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="pages" name="ページ数" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="minutes" name="読書時間（分）" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ReadingLogChart;