import React from 'react';

const AnalysisTable = () => {
  const todayAnalysis = [
    { shuboName: 'A-001', day: 3, hinon: '', shiton: '', baume: '', acidity: '', operation: '分析', afterHeating: '' },
    { shuboName: 'C-003', day: 5, hinon: '', shiton: '', baume: '', acidity: '', operation: '分析', afterHeating: '' }
  ];

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">▼ 分析予定 [A-001(3日目), C-003(5日目)]</h3>
      <div className="border rounded overflow-hidden w-fit">
        <table className="text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-left border-r">酒母名</th>
              <th className="px-2 py-2 text-left border-r">日数</th>
              <th className="px-2 py-2 text-left border-r">品温</th>
              <th className="px-2 py-2 text-left border-r">室温</th>
              <th className="px-2 py-2 text-left border-r">ボーメ</th>
              <th className="px-2 py-2 text-left border-r">酸度</th>
              <th className="px-2 py-2 text-left border-r">操作</th>
              <th className="px-2 py-2 text-left">加温後品温</th>
            </tr>
          </thead>
          <tbody>
            {todayAnalysis.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-3 py-2 border-r font-medium">{item.shuboName}</td>
                <td className="px-3 py-2 border-r">{item.day}日目</td>
                <td className="px-3 py-2 border-r">
                  <input type="text" className="w-12 px-1 py-0.5 border rounded text-center" placeholder="" />
                </td>
                <td className="px-3 py-2 border-r">
                  <input type="text" className="w-12 px-1 py-0.5 border rounded text-center" placeholder="" />
                </td>
                <td className="px-3 py-2 border-r">
                  <input type="text" className="w-12 px-1 py-0.5 border rounded text-center" placeholder="" />
                </td>
                <td className="px-3 py-2 border-r">
                  <input type="text" className="w-12 px-1 py-0.5 border rounded text-center" placeholder="" />
                </td>
                <td className="px-3 py-2 border-r text-center">{item.operation}</td>
                <td className="px-3 py-2">
                  <input type="text" className="w-12 px-1 py-0.5 border rounded text-center" placeholder="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisTable;