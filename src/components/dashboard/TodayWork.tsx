import React from 'react';
import { BarChart3 } from 'lucide-react';
import AnalysisTable from './AnalysisTable';
import BrewingWork from './BrewingWork';
import DischargeWork from './DischargeWork';

const TodayWork = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 size={20} className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">本日の作業</h2>
      </div>

      <AnalysisTable />
      <BrewingWork />
      <DischargeWork />
    </div>
  );
};

export default TodayWork;