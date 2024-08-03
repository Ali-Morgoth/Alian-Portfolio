import { useEffect, useState, useRef } from 'react';
import { doc, getDoc, runTransaction, collection } from "firebase/firestore";
import { firestore } from '../../lib/firebase'; 
import { LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';





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
      setVisits({
        today: data.dailyData[data.dailyData.length - 1].count,
        thisWeek: data.dailyData.slice(-7).reduce((acc, val) => acc + val.count, 0),
        lastWeek: data.dailyData.slice(-14, -7).reduce((acc, val) => acc + val.count, 0),
        thisMonth: data.dailyData.slice(-30).reduce((acc, val) => acc + val.count, 0),
        lastMonth: data.dailyData.slice(-60, -30).reduce((acc, val) => acc + val.count, 0),
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









// const VisitorCounter = () => {
//   const [visits, setVisits] = useState({
//     today: 0,
//     thisWeek: 0,
//     lastWeek: 0,
//     thisMonth: 0,
//     lastMonth: 0,
//     total: 0,
//     dailyData: []
//   });
  
//   const didRun = useRef(false); // Use a ref to track if the effect has run

//   useEffect(() => {
//     if (didRun.current) return; // If the effect has already run, do nothing
//     didRun.current = true; // Set the flag to true to prevent future runs

//     const incrementVisits = async () => {
//       const visitRef = doc(collection(firestore, 'contador'), '3IKbWNdJb8bcxND8NFmX');
//       await runTransaction(firestore, async (transaction) => {
//         const docSnapshot = await transaction.get(visitRef);
//         if (!docSnapshot.exists()) {
//           transaction.set(visitRef, { count: 1, dailyData: [{ date: new Date().toDateString(), count: 1 }] });
//         } else {
//           const data = docSnapshot.data();
//           const todayDate = new Date().toDateString();
//           let dailyData = data.dailyData;

//           // Update today's count
//           if (dailyData[dailyData.length - 1].date === todayDate) {
//             dailyData[dailyData.length - 1].count += 1;
//           } else {
//             dailyData.push({ date: todayDate, count: 1 });
//           }

//           // Prune data older than 30 days
//           if (dailyData.length > 30) {
//             dailyData = dailyData.slice(dailyData.length - 30);
//           }

//           transaction.update(visitRef, {
//             count: data.count + 1,
//             dailyData
//           });
//         }
//       });

//       const docSnapshot = await getDoc(visitRef);
//       const data = docSnapshot.data();
//       setVisits({
//         today: data.dailyData[data.dailyData.length - 1].count,
//         thisWeek: data.dailyData.slice(-7).reduce((acc, val) => acc + val.count, 0),
//         lastWeek: data.dailyData.slice(-14, -7).reduce((acc, val) => acc + val.count, 0),
//         thisMonth: data.dailyData.slice(-30).reduce((acc, val) => acc + val.count, 0),
//         lastMonth: data.dailyData.slice(-60, -30).reduce((acc, val) => acc + val.count, 0),
//         total: data.count,
//         dailyData: data.dailyData
//       });
//     };

//     incrementVisits();
//   }, []);

//   return (
//     <div className="bg-black text-[#00D5A4] rounded-lg p-4 flex items-center justify-between space-x-4 w-full">
//     <div className="flex-1 flex items-center">
//       <div className="text-center mr-4">
//         <p className="text-sm">TODAY</p>
//         <p className="text-lg font-bold">{visits.today}</p>
//       </div>
//       <ResponsiveContainer width={100} height={50}>
//         <LineChart data={visits.dailyData}>
//           <Line type="monotone" dataKey="count" stroke="#00FF00" />
//           <XAxis dataKey="date" />
//           <YAxis  />
//           <Tooltip />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//     <div className="flex-1 text-center">
//       <p className="text-sm">THIS WEEK</p>
//       <p className="text-lg font-bold">{visits.thisWeek}</p>
//     </div>
//     <div className="flex-1 text-center">
//       <p className="text-sm">LAST WEEK</p>
//       <p className="text-lg font-bold">{visits.lastWeek}</p>
//     </div>
//     <div className="flex-1 text-center">
//       <p className="text-sm">THIS MONTH</p>
//       <p className="text-lg font-bold">{visits.thisMonth}</p>
//     </div>
//     <div className="flex-1 text-center">
//       <p className="text-sm">LAST MONTH</p>
//       <p className="text-lg font-bold">{visits.lastMonth}</p>
//     </div>
//     <div className="flex-1 text-center">
//       <p className="text-sm">TOTAL</p>
//       <p className="text-lg font-bold">{visits.total}</p>
//     </div>
//   </div>
//   );
// };


