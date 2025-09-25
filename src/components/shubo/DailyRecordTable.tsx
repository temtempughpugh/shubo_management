import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

interface DailyRecordTableProps {
  shuboId: string;
  isExpanded?: boolean;
}

interface RecordData {
  hinon: string;
  kion: string;
  baume: string;
  acidity: string;
  alcohol: string;
  memo: string;
}

interface DayData {
  morning: RecordData;
  afternoon: RecordData;
  operations: {
    morning: string;
    afternoon: string;
  };
}

interface InputDataType {
  [day: number]: DayData;
}

const DailyRecordTable = ({ shuboId, isExpanded = false }: DailyRecordTableProps) => {
  const days = 15;
  
  // ダミーデータ
  const records = [
    { day: 1, checked: true, morning: { hinon: 28, kion: 25, baume: 8.5, acidity: 1.2, operation: '分析' }, afternoon: { hinon: 27, kion: 24, operation: '加温' } },
    { day: 2, checked: true, morning: { hinon: 26, kion: 23, baume: 8.2, acidity: 1.3 }, afternoon: { hinon: 25, kion: 22 } },
    { day: 3, checked: false, morning: { hinon: 25, kion: 22, baume: 8.0, acidity: 1.4, operation: '分析' }, afternoon: { hinon: 24, kion: 21 } },
    { day: 4, checked: false, morning: {}, afternoon: {} },
    { day: 5, checked: false, morning: {}, afternoon: {} },
    { day: 6, checked: false, morning: {}, afternoon: {} },
    { day: 7, checked: false, morning: {}, afternoon: {} },
    { day: 8, checked: false, morning: {}, afternoon: {} },
    { day: 9, checked: false, morning: {}, afternoon: {} },
    { day: 10, checked: false, morning: {}, afternoon: {} },
    { day: 11, checked: false, morning: {}, afternoon: {} },
    { day: 12, checked: false, morning: {}, afternoon: {} },
    { day: 13, checked: false, morning: {}, afternoon: {} },
    { day: 14, checked: false, morning: {}, afternoon: {} },
    { day: 15, checked: false, morning: {}, afternoon: {} }
  ];

  // グラフ用データ - 0.25と0.75の位置に配置
  const temperatureData = [];
  for (let i = 0; i < days; i++) {
    const dayData = records.find(r => r.day === i + 1);
    // 1-1は0.25の位置
    temperatureData.push({
      day: i + 0.25,
      hinon: dayData?.morning?.hinon || null,
      kion: dayData?.morning?.kion || null
    });
    // 1-2は0.75の位置
    temperatureData.push({
      day: i + 0.75,
      hinon: dayData?.afternoon?.hinon || null,
      kion: dayData?.afternoon?.kion || null
    });
  }

  const [inputData, setInputData] = useState<InputDataType>(() => {
    // 初期データ設定
    const initial: InputDataType = {};
    for (let day = 1; day <= days; day++) {
      initial[day] = {
        morning: { hinon: '', kion: '', baume: '', acidity: '', alcohol: '', memo: '' },
        afternoon: { hinon: '', kion: '', baume: '', acidity: '', alcohol: '', memo: '' },
        operations: { morning: '', afternoon: '' }
      };
    }
    // 1日目の操作例
    initial[1].operations.morning = '水麹';
    initial[1].operations.afternoon = '仕込み';
    initial[2].operations.morning = '打瀬';
    return initial;
  });

  const handleInputChange = (day: number, period: 'morning' | 'afternoon' | 'operations', field: string, value: string) => {
    setInputData((prev: InputDataType) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: {
          ...prev[day][period],
          [field]: value
        }
      }
    }));
  };

  return (
    <div>
      <h4 className="text-sm font-medium mb-2">日別記録（グラフ一体型）</h4>
      
      <div className="w-full">
        {/* 操作表 - グラフの上に配置 */}
        <div className="mb-2">
          <h5 className="text-sm font-medium mb-1">作業操作</h5>
          <table className="text-xs border w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-2 py-1 border-r" style={{ width: '60px' }}>操作</th>
                {Array.from({ length: 15 }, (_, i) => (
                  <th key={i} className="px-2 py-1 border-r text-center" style={{ width: 'calc((100% - 60px) / 15)' }}>
                    {i + 1}日
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-2 py-1 border-r"></th>
                {Array.from({ length: 15 }, (_, i) => (
                  <th key={i} className="px-1 py-1 border-r text-xs">
                    <div className="flex">
                      <div className="flex-1 text-center border-r border-gray-200">{i + 1}-1</div>
                      <div className="flex-1 text-center">{i + 1}-2</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-2 py-1 border-r font-medium bg-gray-50">操作</td>
                {Array.from({ length: 15 }, (_, i) => (
                  <td key={i} className="border-r">
                    <div className="flex">
                      <div className="flex-1 px-0.5">
                        <input 
                          type="text" 
                          value={inputData[i + 1]?.operations?.morning || ''}
                          onChange={(e) => handleInputChange(i + 1, 'operations', 'morning', e.target.value)}
                          className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                          placeholder=""
                        />
                      </div>
                      <div className="flex-1 px-0.5">
                        <input 
                          type="text" 
                          value={inputData[i + 1]?.operations?.afternoon || ''}
                          onChange={(e) => handleInputChange(i + 1, 'operations', 'afternoon', e.target.value)}
                          className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                          placeholder=""
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* グラフエリア */}
        <div 
          className="relative bg-gray-50 border rounded mb-0"
          style={{ 
            width: '100%',
            height: '240px'
          }}
        >
          {/* 縦軸の温度目盛り */}
          <div 
            className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 text-xs"
            style={{ width: '60px' }}
          >
            <div>30℃</div>
            <div>25℃</div>
            <div>20℃</div>
            <div>15℃</div>
            <div>10℃</div>
            <div>5℃</div>
            <div>0℃</div>
          </div>
          
          {/* グラフ本体 */}
          <div 
            className="absolute"
            style={{ 
              left: '60px',
              right: '0px',
              top: '0px',
              bottom: '20px'
            }}
          >
            {/* SVG罫線 */}
            <svg 
              className="absolute w-full h-full pointer-events-none"
              style={{ 
                top: '10px', 
                left: '10px', 
                right: '10px',
                bottom: '10px',
                width: 'calc(100% - 20px)',
                height: 'calc(100% - 20px)'
              }}
            >
              {/* 横罫線 - 5度刻み（0ベース） */}
              {[0, 5, 10, 15, 20, 25, 30].map(temp => (
                <line
                  key={`h-${temp}`}
                  x1="0"
                  y1={`${((30 - temp) / 30) * 100}%`}
                  x2="100%"
                  y2={`${((30 - temp) / 30) * 100}%`}
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
              ))}
              
              {/* 横罫線 - 1度刻み（薄い、0ベース） */}
              {Array.from({ length: 31 }, (_, i) => {
                if (i % 5 !== 0 && i <= 30) { // 5の倍数以外かつ30以下
                  return (
                    <line
                      key={`h-thin-${i}`}
                      x1="0"
                      y1={`${((30 - i) / 30) * 100}%`}
                      x2="100%"
                      y2={`${((30 - i) / 30) * 100}%`}
                      stroke="#f3f4f6"
                      strokeWidth="0.5"
                    />
                  );
                }
                return null;
              })}
              
              {/* 縦罫線 - 整数位置（実線、0ベース） */}
              {Array.from({ length: 16 }, (_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${(i / 15) * 100}%`}
                  y1="0"
                  x2={`${(i / 15) * 100}%`}
                  y2="100%"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
              ))}
              
              {/* 縦罫線 - 0.5位置（点線、0ベース） */}
              {Array.from({ length: 15 }, (_, i) => (
                <line
                  key={`v-dash-${i}`}
                  x1={`${((i + 0.5) / 15) * 100}%`}
                  y1="0"
                  x2={`${((i + 0.5) / 15) * 100}%`}
                  y2="100%"
                  stroke="#d1d5db"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              ))}
            </svg>
            
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={temperatureData} 
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <XAxis 
                  domain={[0, 15]}
                  hide={true}
                />
                <YAxis 
                  domain={[0, 30]}
                  hide={true}
                />
                
                <Line 
                  type="monotone" 
                  dataKey="hinon" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  connectNulls={false}
                  dot={{ r: 4, fill: '#2563eb' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="kion" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  connectNulls={false}
                  dot={{ r: 3, fill: '#16a34a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* 日数ラベル - 各日の中央（0.5の位置）に配置 */}
          <div 
            className="absolute bottom-0 flex text-xs"
            style={{ 
              left: '60px',
              right: '0px',
              height: '20px'
            }}
          >
            {Array.from({ length: 15 }, (_, i) => (
              <div 
                key={i} 
                className="flex-1 text-center flex items-center justify-center"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* テーブル部分 */}
        <table className="text-xs border w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 border-r" style={{ width: '60px' }}></th>
              {Array.from({ length: 15 }, (_, i) => (
                <th key={i} className="px-2 py-1 border-r text-center" style={{ width: 'calc((100% - 60px) / 15)' }}>
                  {i + 1}日
                </th>
              ))}
            </tr>
            <tr>
              <th className="px-2 py-1 border-r"></th>
              {Array.from({ length: 15 }, (_, i) => (
                <th key={i} className="px-2 py-1 border-r text-center">
                  {i < 3 ? '☑' : '☐'}
                </th>
              ))}
            </tr>
            <tr>
              <th className="px-2 py-1 border-r"></th>
              {Array.from({ length: 15 }, (_, i) => (
                <th key={i} className="px-1 py-1 border-r text-xs">
                  <div className="flex">
                    <div className="flex-1 text-center border-r border-gray-200">{i + 1}-1</div>
                    <div className="flex-1 text-center">{i + 1}-2</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-2 py-1 border-r font-medium bg-gray-50">品温</td>
              {Array.from({ length: 15 }, (_, i) => (
                <td key={i} className="border-r">
                  <div className="flex">
                    <div className="flex-1 px-0.5">
                      <input 
                        type="number" 
                        value={inputData[i + 1]?.morning?.hinon || ''}
                        onChange={(e) => handleInputChange(i + 1, 'morning', 'hinon', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                    <div className="flex-1 px-0.5">
                      <input 
                        type="number" 
                        value={inputData[i + 1]?.afternoon?.hinon || ''}
                        onChange={(e) => handleInputChange(i + 1, 'afternoon', 'hinon', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="px-2 py-1 border-r font-medium bg-gray-50">気温</td>
              {Array.from({ length: 15 }, (_, i) => (
                <td key={i} className="border-r">
                  <div className="flex">
                    <div className="flex-1 px-0.5">
                      <input 
                        type="number" 
                        value={inputData[i + 1]?.morning?.kion || ''}
                        onChange={(e) => handleInputChange(i + 1, 'morning', 'kion', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                    <div className="flex-1 px-0.5">
                      <input 
                        type="number" 
                        value={inputData[i + 1]?.afternoon?.kion || ''}
                        onChange={(e) => handleInputChange(i + 1, 'afternoon', 'kion', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="px-2 py-1 border-r font-medium bg-gray-50">ボーメ</td>
              {Array.from({ length: 15 }, (_, i) => (
                <td key={i} className="border-r">
                  <div className="flex">
                    <div className="flex-1 px-0.5">
                      <input 
                        type="number" 
                        step="0.1"
                        value={inputData[i + 1]?.morning?.baume || ''}
                        onChange={(e) => handleInputChange(i + 1, 'morning', 'baume', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                    <div className="flex-1 px-0.5"></div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="px-2 py-1 border-r font-medium bg-gray-50">酸度</td>
              {Array.from({ length: 15 }, (_, i) => (
                <td key={i} className="border-r">
                  <div className="flex">
                    <div className="flex-1 px-0.5">
                      <input 
                        type="number" 
                        step="0.1"
                        value={inputData[i + 1]?.morning?.acidity || ''}
                        onChange={(e) => handleInputChange(i + 1, 'morning', 'acidity', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                    <div className="flex-1 px-0.5"></div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="px-2 py-1 border-r font-medium bg-gray-50">アル</td>
              {Array.from({ length: 15 }, (_, i) => (
                <td key={i} className="border-r">
                  <div className="flex">
                    <div className="flex-1 px-0.5">
                      <input 
                        type="number" 
                        step="0.1"
                        value={inputData[i + 1]?.morning?.alcohol || ''}
                        onChange={(e) => handleInputChange(i + 1, 'morning', 'alcohol', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                    <div className="flex-1 px-0.5"></div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-t">
              <td className="px-2 py-1 border-r font-medium bg-gray-50">メモ</td>
              {Array.from({ length: 15 }, (_, i) => (
                <td key={i} className="border-r">
                  <div className="flex">
                    <div className="flex-1 px-0.5">
                      <input 
                        type="text" 
                        value={inputData[i + 1]?.morning?.memo || ''}
                        onChange={(e) => handleInputChange(i + 1, 'morning', 'memo', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                    <div className="flex-1 px-0.5">
                      <input 
                        type="text" 
                        value={inputData[i + 1]?.afternoon?.memo || ''}
                        onChange={(e) => handleInputChange(i + 1, 'afternoon', 'memo', e.target.value)}
                        className="w-full text-center text-xs border-0 bg-transparent focus:bg-white focus:border" 
                        placeholder=""
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyRecordTable;