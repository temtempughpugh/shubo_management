import React from 'react';

const BrewingWork = () => {
  const brewingPrep = {
    shuboName: 'D-004',
    tankId: 'No.57',
    kumiMizu: 96,
    ice: 12,
    prepKumiMizu: 108,
    kensyaku: 350
  };

  const brewingSchedule = {
    shuboName: 'D-004',
    tankId: 'No.57',
    waterTemp: 15,
    brewingTemp: 18,
    afterKensyaku: 300,
    capacity: 450
  };

  return (
    <div className="grid grid-cols-2 gap-6 mb-4">
      {/* 仕込み準備 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">▼ 仕込み準備</h3>
        <div className="text-sm space-y-1">
          <div className="font-medium">{brewingPrep.shuboName}（{brewingPrep.tankId}）の準備</div>
          <div className="flex gap-4">
            <span>汲み水量: <input type="number" defaultValue={brewingPrep.kumiMizu} className="w-12 px-1 border rounded text-center" />L</span>
            <span>氷量: <input type="number" defaultValue={brewingPrep.ice} className="w-12 px-1 border rounded text-center" />kg</span>
          </div>
          <div className="flex gap-4">
            <span>準備汲み水量: <input type="number" defaultValue={brewingPrep.prepKumiMizu} className="w-12 px-1 border rounded text-center" />L</span>
            <span>尺: <input type="number" defaultValue={brewingPrep.kensyaku} className="w-12 px-1 border rounded text-center" />mm</span>
          </div>
        </div>
      </div>

      {/* 仕込み予定 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">▼ 仕込み予定</h3>
        <div className="text-sm space-y-1">
          <div className="font-medium">{brewingSchedule.shuboName}（{brewingSchedule.tankId}）の仕込み</div>
          <div className="flex gap-4">
            <span>水麹温度: <input type="number" defaultValue={brewingSchedule.waterTemp} className="w-12 px-1 border rounded text-center" />℃</span>
            <span>仕込温度: <input type="number" defaultValue={brewingSchedule.brewingTemp} className="w-12 px-1 border rounded text-center" />℃</span>
          </div>
          <div className="flex gap-4">
            <span>仕込み後尺: <input type="number" defaultValue={brewingSchedule.afterKensyaku} className="w-12 px-1 border rounded text-center" />mm</span>
            <span>容量: {brewingSchedule.capacity}L</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrewingWork;