import { useState } from 'react';
import DailyRecordTable from './DailyRecordTable';
import ShuboDetailModal from './ShuboDetailModal';

interface ShuboDetailRowProps {
  shuboId: string;
}

const ShuboDetailRow = ({ shuboId }: ShuboDetailRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ダミーデータ
  const shuboData = {
    shuboName: 'A-001',
    brewingDate: '2024/09/23',
    dischargeDate: '2024/10/04'
  };

  return (
    <>
      <td colSpan={7} className="px-3 py-4 bg-blue-50">
        <div className="border rounded-lg bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">{shuboData.shuboName} 詳細</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              もっと詳細
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>仕込日: {shuboData.brewingDate}</div>
            <div>卸予定: {shuboData.dischargeDate}</div>
          </div>
          
          {/* 日別記録テーブル（グラフ一体型） */}
          <div>
            <DailyRecordTable shuboId={shuboId} />
          </div>
        </div>
      </td>

      {/* 詳細モーダル */}
      {isModalOpen && (
        <ShuboDetailModal 
          shuboId={shuboId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ShuboDetailRow;