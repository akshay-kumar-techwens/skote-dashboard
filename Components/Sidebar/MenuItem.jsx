import React from 'react';
import { ChevronDown } from 'lucide-react';

const MenuItemComponent = ({
    item,
    isExpanded,
    isActive,
    activeChildId,
    onToggle,
    onClick,
}) => {
    const hasChildren = item.subItems && item.subItems.length > 0;

    // Check if any child is currently active to style the parent
    const containsActiveChild = item.subItems?.some(sub => sub.id === activeChildId);

    // Dynamic classes
    const parentItemClasses = `
    flex items-center w-full px-6 py-[0.65rem] text-[14.4px] transition-colors duration-300 cursor-pointer select-none
    ${containsActiveChild || isExpanded ? 'text-[#fff]' : 'text-[#79829c] hover:text-[#fff]'}
  `;

    const iconClasses = `
    w-[18px] h-[18px] mr-3 transition-colors
    ${containsActiveChild || isExpanded ? 'text-[#fff]' : 'text-[#79829c] group-hover:text-[#fff]'}
  `;

    return (
        <li className="relative group">
            {/* Main Link/Button */}
            <div
                className={parentItemClasses}
                onClick={() => {
                    if (hasChildren) {
                        onToggle();
                    } else {
                        onClick(item.id);
                    }
                }}
            >
                {item.icon && <item.icon className={iconClasses} strokeWidth={1.5} />}

                <span className="flex-1">{item.label}</span>

                {hasChildren && (
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                )}
            </div>

            {/* Sub Menu */}
            {hasChildren && (
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out`}
                    style={{ maxHeight: isExpanded ? `${item.subItems.length * 40}px` : '0px' }}
                >
                    <ul className="pl-0">
                        {item.subItems.map((subItem) => {
                            const isSubActive = activeChildId === subItem.id;
                            return (
                                <li key={subItem.id}>
                                    <div
                                        className={`
                            cursor-pointer block py-[0.4rem] pl-[3.2rem] pr-4 text-[13px] transition-colors duration-200 select-none
                            ${isSubActive ? 'text-[#fff]' : 'text-[#79829c] hover:text-[#fff]'}
                        `}
                                        onClick={() => onClick(subItem.id)}
                                    >
                                        {subItem.label}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default MenuItemComponent;
