import { useEffect, useState, useRef } from 'react';
import { doc, getDoc, runTransaction, collection } from "firebase/firestore";
import { firestore } from '../../lib/firebase'; 
import { LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Helper functions to get the start and end dates of this month and last month
const getStartOfLastMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

const getEndOfLastMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 0);
};

const VisitorCounter = () => {
  const [visits, setVisits] = useState({
    today: 0,
    thisWeek: 0,
    lastWeek: 0,
    thisMonth: 0,
    lastMonth: 0,
    total: 0,
    dailyData: []
  });

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const incrementVisits = async () => {
      const visitRef = doc(collection(firestore, 'contador'), '3IKbWNdJb8bcxND8NFmX');
      await runTransaction(firestore, async (transaction) => {
        const docSnapshot = await transaction.get(visitRef);
        if (!docSnapshot.exists()) {
          transaction.set(visitRef, { count: 1, dailyData: [{ date: new Date().toDateString(), count: 1 }] });
        } else {
          const data = docSnapshot.data();
          const todayDate = new Date().toDateString();
          let dailyData = data.dailyData;

          if (dailyData[dailyData.length - 1].date === todayDate) {
            dailyData[dailyData.length - 1].count += 1;
          } else {
            dailyData.push({ date: todayDate, count: 1 });
          }

          if (dailyData.length > 30) {
            dailyData = dailyData.slice(dailyData.length - 30);
          }

          transaction.update(visitRef, {
            count: data.count + 1,
            dailyData
          });
        }
      });

      const docSnapshot = await getDoc(visitRef);
      const data = docSnapshot.data();
      const today = new Date();
      const startOfLastMonth = getStartOfLastMonth(today);
      const endOfLastMonth = getEndOfLastMonth(today);

      const lastMonthCount = data.dailyData
        .filter(entry => new Date(entry.date) >= startOfLastMonth && new Date(entry.date) <= endOfLastMonth)
        .reduce((acc, val) => acc + val.count, 0);

      setVisits({
        today: data.dailyData[data.dailyData.length - 1].count,
        thisWeek: data.dailyData.slice(-7).reduce((acc, val) => acc + val.count, 0),
        lastWeek: data.dailyData.slice(-14, -7).reduce((acc, val) => acc + val.count, 0),
        thisMonth: data.dailyData.slice(-30).reduce((acc, val) => acc + val.count, 0),
        lastMonth: lastMonthCount,
        total: data.count,
        dailyData: data.dailyData
      });
    };

    incrementVisits();
  }, []);

  return (
    <div className="bg-black text-[#e91e63] rounded-lg p-4 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="text-center lg:text-left">
          <p className="text-sm">TODAY</p>
          <p className="text-lg font-bold">{visits.today}</p>
        </div>
        <div className="text-center lg:text-left">
          <p className="text-sm">THIS WEEK</p>
          <p className="text-lg font-bold">{visits.thisWeek}</p>
        </div>
        <div className="text-center lg:text-left">
          <p className="text-sm">LAST WEEK</p>
          <p className="text-lg font-bold">{visits.lastWeek}</p>
        </div>
        <div className="text-center lg:text-left">
          <p className="text-sm">THIS MONTH</p>
          <p className="text-lg font-bold">{visits.thisMonth}</p>
        </div>
        <div className="text-center lg:text-left">
          <p className="text-sm">LAST MONTH</p>
          <p className="text-lg font-bold">{visits.lastMonth}</p>
        </div>
        <div className="text-center lg:text-left">
          <p className="text-sm">TOTAL</p>
          <p className="text-lg font-bold">{visits.total}</p>
        </div>
      </div>
      <div className="mt-4 lg:mt-0">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={visits.dailyData}>
            <Line type="monotone" dataKey="count" stroke="#00FF00" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorCounter;






