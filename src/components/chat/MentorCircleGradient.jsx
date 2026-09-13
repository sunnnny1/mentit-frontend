const imgPurpleOpen = 'https://www.figma.com/api/mcp/asset/ffa639a8-bb88-481e-a59b-66c0d7d79104.svg';
const imgPurpleClosed = 'https://www.figma.com/api/mcp/asset/6ff81ed3-47cc-458e-9e8f-79db09c17900.svg';
const imgRedGradient = 'https://www.figma.com/api/mcp/asset/5514322e-6f8f-463d-b4e8-fb6d05d6dcc4.svg';
const imgBlueOpen = 'https://www.figma.com/api/mcp/asset/12bcb800-1405-4d02-8c73-f4ac5afab86d.svg';
const imgBlueClosed = 'https://www.figma.com/api/mcp/asset/144911dd-0bab-4448-b7f1-60eccce50112.svg';

export default function MentorCircleGradient({ className, isSubMenuOpen = true, gradientColor = 'purple' }) {
  const src =
    gradientColor === 'red'
      ? imgRedGradient
      : gradientColor === 'blue'
        ? isSubMenuOpen
          ? imgBlueOpen
          : imgBlueClosed
        : isSubMenuOpen
          ? imgPurpleOpen
          : imgPurpleClosed;
  const insetClass = gradientColor === 'purple' ? 'inset-[-50%]' : 'inset-[-58.82%]';

  return (
    <div className={className || 'relative size-[340px]'}>
      <div className={`absolute ${insetClass}`}>
        <img alt="" className="block max-w-none size-full" src={src} />
      </div>
    </div>
  );
}
