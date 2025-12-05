import React from 'react';

// Types and Enums
const PaymentStatus = {
    PAID: 'Paid',
    REFUND: 'Refund',
    CHARGEBACK: 'Chargeback'
};

const PaymentMethodType = {
    PAYPAL: 'Paypal',
    VISA: 'Visa',
    MASTERCARD: 'Mastercard'
};

// Data
const TRANSACTIONS = [
    {
        id: '1',
        orderId: '#SK2545',
        billingName: 'Jacob Hunter',
        date: '04 Oct, 2019',
        total: '$392',
        paymentStatus: PaymentStatus.PAID,
        paymentMethod: PaymentMethodType.PAYPAL
    },
    {
        id: '2',
        orderId: '#SK2544',
        billingName: 'Ronald Taylor',
        date: '04 Oct, 2019',
        total: '$404',
        paymentStatus: PaymentStatus.REFUND,
        paymentMethod: PaymentMethodType.VISA
    },
    {
        id: '3',
        orderId: '#SK2543',
        billingName: 'Barry Dick',
        date: '05 Oct, 2019',
        total: '$412',
        paymentStatus: PaymentStatus.PAID,
        paymentMethod: PaymentMethodType.MASTERCARD
    },
    {
        id: '4',
        orderId: '#SK2542',
        billingName: 'Juan Mitchell',
        date: '06 Oct, 2019',
        total: '$384',
        paymentStatus: PaymentStatus.PAID,
        paymentMethod: PaymentMethodType.PAYPAL
    },
    {
        id: '5',
        orderId: '#SK2541',
        billingName: 'Jamal Burnett',
        date: '07 Oct, 2019',
        total: '$380',
        paymentStatus: PaymentStatus.CHARGEBACK,
        paymentMethod: PaymentMethodType.VISA
    },
    {
        id: '6',
        orderId: '#SK2540',
        billingName: 'Neal Matthews',
        date: '07 Oct, 2019',
        total: '$400',
        paymentStatus: PaymentStatus.PAID,
        paymentMethod: PaymentMethodType.MASTERCARD
    }
];

// Components

const PaymentIcon = ({ type }) => {
    switch (type) {
        case PaymentMethodType.PAYPAL:
            return (
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.05-4.336 6.794-9.067 6.794H8.739l-1.663 8.01Z" />
                        <path fill="#009cde" d="M8.739 13.328l-1.663 8.009h4.127c.466 0 .863-.339.936-.797l.02-.138.616-3.925.176-1.117c.073-.458-.205-.797-.67-.797H9.72c.557-3.563 3.323-4.828 7.33-4.573-1.108 2.152-3.823 3.34-8.31 3.34Z" />
                        <path fill="#003087" d="M8.739 13.328h2.282c3.941 0 6.72-1.26 7.454-5.35.26-1.404-.046-2.252-.695-2.992-1.112-1.267-3.12-1.81-5.69-1.81H5.998C5.474 2.778 5.026 3.16 4.944 3.68L2.79 17.352a.643.643 0 0 0 .633.741h4.604l.712-4.765Z" />
                    </svg>
                    <span className="text-[13px] text-[#495057]">{type}</span>
                </div>
            );
        case PaymentMethodType.VISA:
            return (
                <div className="flex items-center gap-2">
                    <svg className="w-8 h-4" viewBox="0 0 36 12" fill="currentColor">
                        <path fill="#1A1F71" d="M13.97 11.54H11.6L13.08 2.28h2.36l-1.47 9.26zm7.88-9.12c-.63-.24-1.62-.5-2.88-.5-3.18 0-5.42 1.69-5.43 4.11-.02 1.79 1.6 2.78 2.82 3.38 1.25.61 1.67 1.01 1.67 1.56 0 .84-1.01 1.22-1.95 1.22-1.3 0-2-.2-3.07-.67l-.43-.21-.46 2.83c.77.35 2.18.66 3.65.66 3.44 0 5.68-1.7 5.7-4.33.01-1.44-.86-2.55-2.74-3.44-.91-.46-1.47-.77-1.47-1.24 0-.43.48-.87 1.52-.87 1.22 0 2.11.22 2.79.52l.34.16.46-2.98zM34.7 11.54h-2.14c-.66 0-1.16-.39-1.45-1.1l-5.08-10.8h3.1l3.06 7.52h.07l2.91-7.52h2.74L34.7 11.54zm-19.1-9.26h-1.83L11.18 8.7l-.23-1.14C10.55 5.36 9.02 3.7 7.36 2.88L9.6 11.54H6.26L3.85 2.28H0l-.1.48c2.77.71 5.92 2.42 7.9 6.06l-1.36 6.8L15.6 11.54z" />
                    </svg>
                    <span className="text-[13px] text-[#495057]">{type}</span>
                </div>
            );
        case PaymentMethodType.MASTERCARD:
            return (
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 16" fill="none">
                        <rect width="24" height="16" rx="2" fill="white" fillOpacity="0.01" />
                        <circle cx="7" cy="8" r="6" fill="#EB001B" />
                        <circle cx="17" cy="8" r="6" fill="#F79E1B" />
                        <path d="M12 12.899C10.2455 12.899 8.63181 12.2988 7.34473 11.2969C8.26343 10.3848 10.0605 8.70703 12 8C13.9395 8.70703 15.7366 10.3848 16.6553 11.2969C15.3682 12.2988 13.7545 12.899 12 12.899Z" fill="#FF5F00" />
                    </svg>
                    <span className="text-[13px] text-[#495057]">{type}</span>
                </div>
            );
        default:
            return <span>{type}</span>;
    }
};

const StatusBadge = ({ status }) => {
    let styles = '';

    switch (status) {
        case PaymentStatus.PAID:
            styles = 'bg-[rgba(52,195,143,0.18)] text-[#34c38f]';
            break;
        case PaymentStatus.REFUND:
            styles = 'bg-[rgba(241,180,76,0.18)] text-[#f1b44c]';
            break;
        case PaymentStatus.CHARGEBACK:
            styles = 'bg-[rgba(244,106,106,0.18)] text-[#f46a6a]';
            break;
        default:
            styles = 'bg-gray-100 text-gray-600';
    }

    return (
        <span className={`px-[8px] py-[2px] rounded-[4px] text-[11px] font-medium ${styles}`}>
            {status}
        </span>
    );
};

const TransactionTable = () => {
    return (
        <div className="bg-white rounded-lg shadow-[0_0.75rem_1.5rem_rgba(18,38,63,0.03)] border border-gray-100 font-sans">
            <div className="p-6 border-b border-[#eff2f7]">
                <h4 className="text-[15px] font-semibold text-[#495057]">Latest Transaction</h4>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap align-middle">
                    <thead className="bg-[#f8f9fa]">
                        <tr>
                            <th className="pl-6 pr-2 py-3 w-10">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-[#556ee6] border-[#74788d] rounded focus:ring-[#556ee6] cursor-pointer"
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#495057]">Order ID</th>
                            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#495057]">Billing Name</th>
                            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#495057]">Date</th>
                            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#495057]">Total</th>
                            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#495057]">Payment Status</th>
                            <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#495057]">Payment Method</th>
                            <th className="px-6 py-3 text-center text-[13px] font-semibold text-[#495057]">View Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eff2f7]">
                        {TRANSACTIONS.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-[#f8f9fa] transition-colors duration-200">
                                <td className="pl-6 pr-2 py-4">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-[#556ee6] border-gray-300 rounded focus:ring-[#556ee6] cursor-pointer"
                                    />
                                </td>
                                <td className="px-6 py-4 text-[13px]">
                                    <a href={`#${transaction.orderId}`} className="text-[#495057] font-bold hover:text-[#556ee6] transition-colors">
                                        {transaction.orderId}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-[13px] text-[#495057]">
                                    {transaction.billingName}
                                </td>
                                <td className="px-6 py-4 text-[13px] text-[#495057]">
                                    {transaction.date}
                                </td>
                                <td className="px-6 py-4 text-[13px] text-[#495057]">
                                    {transaction.total}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={transaction.paymentStatus} />
                                </td>
                                <td className="px-6 py-4">
                                    <PaymentIcon type={transaction.paymentMethod} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="bg-[#556ee6] hover:bg-[#4458b8] text-white text-[11px] font-medium py-[5px] px-[10px] rounded-[4px] shadow-sm transition-all">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionTable;
