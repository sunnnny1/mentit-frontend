import { useEffect, useRef, useState } from 'react';
import CheckRow from '../JobCheckRow';
import { JOB_CATEGORIES } from '../../data/jobCategories';
import imgChevronDown from '../../assets/figma/2a8c0fab-ff12-4088-9976-f8cdb0698792.svg';
import imgChevronRight from '../../assets/icons/chevron-right.svg';

function triggerLabel(group, roles) {
  if (!group && roles.length === 0) return '직군/직무 선택';
  if (roles.length === 0) return group;
  if (roles.length === 1) return roles[0];
  return `${roles[0]} 외 ${roles.length - 1}개`;
}

export default function BoardJobDropdown({
  className = 'relative flex-1 min-w-0',
  onApply,
  initialGroup = '',
  initialRoles = [],
}) {
  const [open, setOpen] = useState(false);
  const [appliedGroup, setAppliedGroup] = useState(initialGroup);
  const [appliedRoles, setAppliedRoles] = useState(initialRoles);
  const [draftGroup, setDraftGroup] = useState('');
  const [draftRoles, setDraftRoles] = useState([]);
  const rootRef = useRef(null);

  const draftCategory = JOB_CATEGORIES.find((item) => item.group === draftGroup);
  const draftRoleOptions = draftCategory?.roles ?? [];

  const closeWithoutApply = () => {
    setOpen(false);
    setDraftGroup(appliedGroup);
    setDraftRoles(appliedRoles);
  };

  const openPanel = () => {
    setDraftGroup(appliedGroup);
    setDraftRoles(appliedRoles);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) closeWithoutApply();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, appliedGroup, appliedRoles]);

  const selectGroup = (group) => {
    if (draftGroup === group) return;
    setDraftGroup(group);
    setDraftRoles([]);
  };

  const toggleRole = (role) => {
    setDraftRoles((current) =>
      current.includes(role) ? current.filter((item) => item !== role) : [...current, role],
    );
  };

  const apply = () => {
    setAppliedGroup(draftGroup);
    setAppliedRoles(draftRoles);
    setOpen(false);
    onApply?.({ group: draftGroup, roles: draftRoles });
  };

  return (
    <div ref={rootRef} className={className}>
      <button
        type="button"
        onClick={() => (open ? closeWithoutApply() : openPanel())}
        className="relative overflow-hidden bg-white border border-[#e7eaee] rounded-xl w-[300px] px-5 py-4 flex items-center gap-2 cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
        aria-expanded={open}
      >
        <span className="relative flex-1 text-left font-normal text-[16px] leading-[1.45] text-[#121213]">
          {triggerLabel(appliedGroup, appliedRoles)}
        </span>
        <img alt="" src={imgChevronDown} className={`relative size-6 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 bg-white border border-[#e7eaee] rounded-xl px-4 py-6 flex flex-col gap-5 items-end shadow-[0_0_8px_rgba(18,18,19,0.04)]">
          <div className={`flex gap-5 items-start ${draftGroup ? 'w-[570px]' : 'w-[268px]'}`}>
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <p className="px-3 font-bold text-[16px] leading-[1.45] text-[#121213]">직군</p>
              <div className="flex flex-col gap-2">
                {JOB_CATEGORIES.map((item) => {
                  const selected = draftGroup === item.group;
                  return (
                    <button
                      key={item.group}
                      type="button"
                      onClick={() => selectGroup(item.group)}
                      className={`relative overflow-hidden flex items-center justify-between gap-2 w-full h-[46px] px-4 rounded-xl cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity ${
                        selected ? 'bg-[#f4f6f8]' : 'bg-white'
                      }`}
                    >
                      <span className="relative font-normal text-[14px] leading-[1.58] tracking-[0.14px] text-[#121213]">
                        {item.group}
                      </span>
                      <img alt="" src={imgChevronRight} className="relative size-5 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
            {draftGroup ? (
              <div className="flex-1 min-w-0 flex flex-col gap-4">
                <p className="px-3 font-bold text-[16px] leading-[1.45] text-[#121213]">직무</p>
                <div
                  className="show-scrollbar flex min-h-0 flex-col gap-2 overscroll-contain pr-1"
                  style={{ height: 316, overflowY: 'auto' }}
                >
                  {draftRoleOptions.map((label) => (
                    <CheckRow
                      key={label}
                      label={label}
                      checked={draftRoles.includes(label)}
                      onToggle={() => toggleRole(label)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {draftGroup ? (
            <>
              <div className="h-px bg-[#e7eaee] self-stretch" />
              <button
                type="button"
                onClick={apply}
                className="relative overflow-hidden shrink-0 border border-[#70d2ff] bg-[#1a75ff] rounded-lg px-5 py-2 flex items-center justify-center shadow-[inset_0_0_4px_0_#e7f3ff] cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:bg-[#121213] after:opacity-0 hover:after:opacity-10 after:transition-opacity"
              >
                <span className="relative font-bold text-[15px] leading-[1.45] text-white whitespace-nowrap">적용하기</span>
              </button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
