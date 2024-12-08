import React from 'react';

interface ClientCardProps {
    id: number;
    clientName: string;
    service: string;
    date: string;
    amountDue: string;
    status: string;
    actionDate: string | null;
    onAction: (id: number, action: 'Accepted' | 'Declined') => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ 
    id, 
    clientName, 
    service, 
    date, 
    amountDue, 
    status, 
    actionDate, 
    onAction 
}) => {
    return (
        <div className="bg-white p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center relative">
            <div>
                <h3 className="text-lg font-bold">{clientName}</h3>
                <p className="text-sm text-gray-600">Service: {service}</p>
                <p className="text-sm text-gray-600">Date: {date}</p>
                <p className="text-sm text-gray-600">Amount Due: {amountDue}</p>
                <p
                    className={`mt-2 text-sm font-medium ${
                        status === 'Accepted'
                            ? 'text-teal-600'
                            : status === 'Declined'
                            ? 'text-red-600'
                            : 'text-yellow-500'
                    }`}
                >
                    Status: {status}
                </p>
                {actionDate && (
                    <p className="text-sm text-gray-500">Action Date: {actionDate}</p>
                )}
            </div>
            <div className="absolute bottom-4 right-4 space-x-2">
                <button
                    className="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-green-600 transition text-sm"
                    onClick={() => onAction(id, 'Accepted')}
                >
                    Accept
                </button>
                <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                    onClick={() => onAction(id, 'Declined')}
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

export default ClientCard;
