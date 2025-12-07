import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import GlassCard from "./GlassCard.tsx";
import { mockAnalyses } from "../data/mock.ts";

const AnalysisChartCard: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string>("Glicemie");


  const testNames = Array.from(new Set(mockAnalyses.map((a) => a.testName)));


  const data = useMemo(() => {
    return mockAnalyses
      .filter((a) => a.testName === selectedTest)
      .map((a) => ({
        date: a.testDate,
        value: parseFloat(a.result),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedTest]);

  return (
    <GlassCard title="Evoluția analizelor">

      <div className="chart-toolbar">
        <select
          className="glass-select"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          {testNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

 
      {data.length > 0 ? (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.8)" />
              <YAxis stroke="rgba(255,255,255,0.8)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00ffff"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="placeholder">Nu există date pentru analiza selectată.</p>
      )}
    </GlassCard>
  );
};

export default AnalysisChartCard;
