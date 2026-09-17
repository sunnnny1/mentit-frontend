import figma_ffa639a8_bb88_481e_a59b_66c0d7d79104_svg from '../../assets/figma/ffa639a8-bb88-481e-a59b-66c0d7d79104.svg';
import figma_6ff81ed3_47cc_458e_9e8f_79db09c17900_svg from '../../assets/figma/6ff81ed3-47cc-458e-9e8f-79db09c17900.svg';
import figma_5514322e_6f8f_463d_b4e8_fb6d05d6dcc4_svg from '../../assets/figma/5514322e-6f8f-463d-b4e8-fb6d05d6dcc4.svg';
import figma_12bcb800_1405_4d02_8c73_f4ac5afab86d_svg from '../../assets/figma/12bcb800-1405-4d02-8c73-f4ac5afab86d.svg';
import figma_144911dd_0bab_4448_b7f1_60eccce50112_svg from '../../assets/figma/144911dd-0bab-4448-b7f1-60eccce50112.svg';

const imgPurpleOpen = figma_ffa639a8_bb88_481e_a59b_66c0d7d79104_svg;
const imgPurpleClosed = figma_6ff81ed3_47cc_458e_9e8f_79db09c17900_svg;
const imgRedGradient = figma_5514322e_6f8f_463d_b4e8_fb6d05d6dcc4_svg;
const imgBlueOpen = figma_12bcb800_1405_4d02_8c73_f4ac5afab86d_svg;
const imgBlueClosed = figma_144911dd_0bab_4448_b7f1_60eccce50112_svg;

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
