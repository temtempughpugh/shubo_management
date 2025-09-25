import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import ShuboDetailRow from '../shubo/ShuboDetailRow';

const ShuboTable = () => {
  const [selectedShubo, setSelectedShubo] = useState<string | null>(null);

  const shuboList = [
    { shuboName: 'A-001', tankId: 'No.801', type: '速醸', currentDay: 3, totalDays: 11, progress: 27, status: '管理中', analysisToday: true },
    { shuboName: 'B-002', tankId: 'No.650', type: '速醸', currentDay: 7, totalDays: 11, progress: 64, status: '管理中', analysisToday: false },
    { shuboName: 'C-003', tankId: 'No.552', type: '高温糖化', currentDay: 5, totalDays: 8, progress: 63, status: '管理中', analysisToday: true },
    { shuboName: 'D-004', tankId: 'No.57', type: '速醸', currentDay: 0, totalDays: 11, progress: 0, status: '準備中', analysisToday: false }
  ];

  const handleShuboClick = (shuboName: string) => {
    setSelectedShubo(selectedShubo === shuboName ? null : shuboName);
  };

  const renderDetailedView = (shubo: any) => {
    return (
      <tr key={`${shubo.shuboName}-detail`}>
        <ShuboDetailRow shuboId={shubo.shuboName} />
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 size={20} className="text-green-600" />
        <h2 className="text-lg font-semibold text-gray-800">現在進行中の酒母</h2>
      </div>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left border-r">酒母名</th>
              <th className="px-2 py-2 text-left border-r">タンク</th>
              <th className="px-2 py-2 text-left border-r">種類</th>
              <th className="px-2 py-2 text-left border-r">日数</th>
              <th className="px-2 py-2 text-left border-r">進行率</th>
              <th className="px-2 py-2 text-left border-r">ステータス</th>
              <th className="px-2 py-2 text-left">分析日</th>
            </tr>
          </thead>
          <tbody>
            {shuboList.map((shubo, index) => (
              <React.Fragment key={index}>
                <tr 
                  className={`border-t cursor-pointer hover:bg-gray-50 ${selectedShubo === shubo.shuboName ? 'bg-blue-50' : ''}`}
                  onClick={() => handleShuboClick(shubo.shuboName)}
                >
                  <td className="px-3 py-2 border-r font-medium">{shubo.shuboName}</td>
                  <td className="px-3 py-2 border-r">{shubo.tankId}</td>
                  <td className="px-3 py-2 border-r">{shubo.type}</td>
                  <td className="px-3 py-2 border-r">{shubo.currentDay}/{shubo.totalDays}</td>
                  <td className="px-3 py-2 border-r">{shubo.progress}%</td>
                  <td className="px-3 py-2 border-r">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      shubo.status === '管理中' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {shubo.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    {shubo.analysisToday && <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto"></div>}
                  </td>
                </tr>
                {selectedShubo === shubo.shuboName && renderDetailedView(shubo)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShuboTable;