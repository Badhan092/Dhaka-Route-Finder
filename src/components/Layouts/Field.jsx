import React from "react";

const Field = ({ id, label, Icon, children }) => (
  <div className="w-full flex-1">
    <label
      htmlFor={id}
      className="mb-1 block text-xs font-bold uppercase text-slate-500"
    >
      {label}
    </label>
    <div className="relative">
      <Icon
        className="absolute left-3.5 top-3 h-4 w-4 text-slate-400"
        aria-hidden="true"
      />
      {children}
    </div>
  </div>
);

export default Field;