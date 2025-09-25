import React from 'react';
import { X } from 'lucide-react';
import DailyRecordTable from './DailyRecordTable';

interface ShuboDetailModalProps {
  shuboId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShuboDetailModal = ({ shuboId, isOpen, onClose }: ShuboDetailModalProps) => {
  if (!isOpen) return null;

  // ダミーデータ
  const shuboData = {
    shuboName: 'A-001',
    brewingDate: '2024/09/23',
    dischargeDate: '2024/10/04',
    yeast: '協会9号',
    rawMaterial: '山田錦',
    brewingScale: 1350,
    totalRice: 80
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{shuboData.shuboName} 詳細（拡張モード）</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-4">
          {/* 基本情報 */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            <div>仕込日: {shuboData.brewingDate}</div>
            <div>卸予定: {shuboData.dischargeDate}</div>
            <div>酵母: {shuboData.yeast}</div>
            <div>原料: {shuboData.rawMaterial}</div>
            <div>仕込規模: {shuboData.brewingScale}kg</div>
            <div>総米: {shuboData.totalRice}kg</div>
          </div>

          {/* 日別記録テーブル（拡張版・グラフ一体型） */}
          <div>
            <DailyRecordTable shuboId={shuboId} isExpanded={true} />
          </div>
        </div>

        {/* フッター */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            閉じる
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded">
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShuboDetailModal;