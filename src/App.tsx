import React from 'react';
import DateNavigation from './components/dashboard/DateNavigation';
import TodayWork from './components/dashboard/TodayWork';
import ShuboTable from './components/dashboard/ShuboTable';

function App() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <DateNavigation />
        <TodayWork />
        <ShuboTable />
      </div>
    </div>
  );
}

export default App;