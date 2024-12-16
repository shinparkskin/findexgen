"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@nextui-org/react";
import { database } from "./firebase";
import { ref, child, get } from "firebase/database";

const getVisitorsData = async () => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "visitors"));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    console.log("No data available");
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getLast5Days = (visitors) => {
  if (!visitors || !Array.isArray(visitors)) return [];
  
  return visitors.slice(-5).map(item => ({
    date: item.name,
    visitors: item.visitors
  }));
};

export default function BarchartComponent() {
  const [chartData, setChartData] = useState([]);
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      const visitorsData = await getVisitorsData();
      setChartData(getLast5Days(visitorsData));
    };

    fetchVisitors();
  }, []);
  console.log('chartData:', chartData);
  console.log('visitors:', visitors);

  return (
    <div className="w-full h-full flex justify-center items-center py-5">
    <Card className="w-full h-[20vh] border border-transparent dark:border-default-100">
      <div className="flex flex-col gap-y-2 p-4">
        <div className="flex items-center justify-center gap-x-2">
          <h3 className="text-small font-medium text-default-500 text-center">일일 이용자수</h3>
          
        </div>
      </div>

      <ResponsiveContainer width="90%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="visitors" fill="hsl(var(--nextui-primary-300))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
    </div>
  );
}
