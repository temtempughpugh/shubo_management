import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Thermometer, Droplets } from 'lucide-react';

const DateNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2024-09-25'));

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date('2024-09-25'));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 mb-4">
      <div className="flex items-center gap-3">
        <button onClick={handlePrevDay} className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 font-medium">
          <Calendar size={18} />
          <span className="text-lg">{formatDate(currentDate)}({getDayOfWeek(currentDate)})</span>
        </div>
        <button onClick={handleNextDay} className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight size={20} />
        </button>
        <button onClick={handleToday} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          今日
        </button>
        <div className="flex items-center gap-4 ml-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Thermometer size={16} />
            <span>気温: 25℃</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets size={16} />
            <span>湿度: 60%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateNavigation;