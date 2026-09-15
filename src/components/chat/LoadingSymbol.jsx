import { useState } from 'react';
import mentitLoadingGif from '../../assets/mentit-loading.gif';

// 질문/멘토와 무관하게 항상 같은 시작 프레임부터 재생되는 로딩 심볼.
// 같은 gif src를 그대로 재사용하면 브라우저가 이전 재생 타이밍을 이어받아
// 매번 다른 프레임에서 시작한 것처럼 보였다. 그래서 이 컴포넌트가 새로 마운트될
// 때마다(=isAnswering이 true가 될 때마다) 캐시버스팅 키를 새로 만들어 img를
// 완전히 새로 불러오게 해서, 항상 gif의 첫 프레임부터 재생을 시작하게 한다.
export default function LoadingSymbol({ size = 72, className = '' }) {
  const [playKey] = useState(() => Date.now());

  return (
    <div className={className} style={{ width: size, height: size }}>
      <img
        key={playKey}
        alt=""
        src={`${mentitLoadingGif}?play=${playKey}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
