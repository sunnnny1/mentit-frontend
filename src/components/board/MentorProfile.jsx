const PROFILE_SIZE = {
  default: 60,
  medium: 42,
  small: 36,
  xs: 20,
};

export default function MentorProfile({ src, size = 'default', className = '' }) {
  const px = typeof size === 'number' ? size : (PROFILE_SIZE[size] ?? PROFILE_SIZE.default);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: px, height: px }}
    >
      <img alt="" src={src} width={px} height={px} className="absolute inset-0 size-full max-w-none" />
    </div>
  );
}
