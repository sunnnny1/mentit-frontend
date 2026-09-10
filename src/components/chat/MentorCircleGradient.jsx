const imgOpen = 'https://www.figma.com/api/mcp/asset/ffa639a8-bb88-481e-a59b-66c0d7d79104.svg';
const imgClosed = 'https://www.figma.com/api/mcp/asset/6ff81ed3-47cc-458e-9e8f-79db09c17900.svg';

export default function MentorCircleGradient({ className, isSubMenuOpen = true }) {
  const src = isSubMenuOpen ? imgOpen : imgClosed;
  const insetClass = isSubMenuOpen ? 'inset-[-58.82%]' : 'inset-[-50%]';

  return (
    <div className={className || 'relative size-[340px]'}>
      <div className={`absolute ${insetClass}`}>
        <img alt="" className="block max-w-none size-full" src={src} />
      </div>
    </div>
  );
}
