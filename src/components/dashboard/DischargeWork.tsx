import React from 'react';

const DischargeWork = () => {
  const discharge = {
    shuboName: 'B-002',
    tankId: 'No.650',
    beforeKensyaku: 250,
    beforeCapacity: 600,
    afterKensyaku: 400,
    afterCapacity: 200,
    addTank: 'No.15',
    kumiMizu: 150
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">▼ 卸し予定</h3>
      <div className="text-sm space-y-1">
        <div className="font-medium">{discharge.shuboName}（{discharge.tankId}）の卸し</div>
        <div className="flex gap-4">
          <span>卸前尺: <input type="number" defaultValue={discharge.beforeKensyaku} className="w-12 px-1 border rounded text-center" />mm</span>
          <span>→ 卸前容量: {discharge.beforeCapacity}L</span>
        </div>
        <div className="flex gap-4">
          <span>卸後尺: <input type="number" defaultValue={discharge.afterKensyaku} className="w-12 px-1 border rounded text-center" />mm</span>
          <span>→ 卸後容量: {discharge.afterCapacity}L</span>
        </div>
        <div className="flex gap-4">
          <span>添タンク: <input type="text" defaultValue={discharge.addTank} className="w-16 px-1 border rounded text-center" /></span>
          <span>汲み水量: <input type="number" defaultValue={discharge.kumiMizu} className="w-12 px-1 border rounded text-center" />L</span>
        </div>
      </div>
    </div>
  );
};

export default DischargeWork;