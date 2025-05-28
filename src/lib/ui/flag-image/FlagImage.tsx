import flagsSprite from '/assets/flags.png';

export interface FlagImageProps {
  code: string;
}

const flagOrderInSrc = ['AUT', 'BLR', 'CAN', 'CHN', 'FRA', 'GER', 'ITA', 'NED', 'NOR', 'RUS', 'SUI', 'SWE', 'USA'];

const flagIndex: Record<string, number> = flagOrderInSrc
  .reduce((prev, curr, i) => ({ ...prev, [curr]: i }), {} as Record<string, number>);

export function FlagImage({
  code
}: FlagImageProps) {
  const index = flagIndex[code] ?? 0;
  const yOffset = index * -17;

  return (
    <span
      style={{
        display: 'inline-block',
        width: `28px`,
        height: `17px`,
        backgroundImage:`url(${flagsSprite})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition: `0 ${yOffset}px`,
      }}
    />
  );
}
