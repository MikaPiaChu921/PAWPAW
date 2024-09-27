import React from "react";

function NavItem({
  callBack,
  itemName,
  itemIcon,
  active,
  hoverBackgroundColor = "#1794A1",
  hoverTextColor = "text-white",
  disabled,
  onClick,
}) {
  return (
    <li>
      <a
        onClick={(e) => {
          if (callBack) callBack(itemName);
          if (onClick) onClick(e);
        }}
        className={`flex items-center p-2 text-gray-900 rounded-lg ${
          active === itemName && `bg-[${hoverBackgroundColor}]`
        } ${
          !disabled &&
          `hover:bg-[${hoverBackgroundColor}] hover:${hoverTextColor} dark:hover:hover:bg-[${hoverBackgroundColor}] cursor-pointer`
        }  group`}
      >
        <i className={itemIcon}></i>
        <span className="ms-3">{itemName}</span>
      </a>
    </li>
  );
}

export default NavItem;
