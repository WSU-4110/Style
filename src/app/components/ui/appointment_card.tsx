import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaHistory } from 'react-icons/fa';

interface AppointmentCardProps {
  id: number;
  businessName: string;
  service: string;
  amountDue: string;
  date: string;
  time: string;
  address: string;
  cancelledOn?: string;
  isHistory?: boolean;
  onCancel?: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  id,
  businessName,
  service,
  amountDue,
  date,
  time,
  address,
  cancelledOn,
  isHistory = false,
  onCancel,
  onViewDetails,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-500">
      <h3 className="text-lg font-medium text-gray-800">{businessName}</h3>
      <p className="text-sm text-gray-600">{service}</p>

      <div className="mt-2 text-gray-600">
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-[#d8ba7a]" />
          <span>{date}, {time}</span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <FaDollarSign className="text-[#d8ba7a]" />
          <span>{amountDue}</span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <FaMapMarkerAlt className="text-[#d8ba7a]" />
          <span>{address}</span>
        </div>
      </div>

      {isHistory && cancelledOn ? (
        <p className="text-xs text-red-500 mt-2">Cancelled on {cancelledOn}</p>
      ) : null}

      <div className="flex justify-end space-x-2 mt-4">
        {!isHistory && onCancel && (
          <button
            onClick={() => onCancel(id)}
            className="px-3 py-1 text-sm font-medium text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        )}
        <button
          onClick={() => onViewDetails(id)}
          className="px-3 py-1 text-sm font-medium text-[#d8ba7a] border border-[#d8ba7a] rounded-md hover:bg-[#d8ba7a] hover:text-white"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
