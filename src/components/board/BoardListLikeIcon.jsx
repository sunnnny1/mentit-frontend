export default function BoardListLikeIcon({ liked, src, sizeClass = 'size-5' }) {
  return (
    <span
      aria-hidden
      className={`block ${sizeClass}`}
      style={{
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        backgroundColor: liked ? '#1A75FF' : '#DFE4E8',
      }}
    />
  );
}
