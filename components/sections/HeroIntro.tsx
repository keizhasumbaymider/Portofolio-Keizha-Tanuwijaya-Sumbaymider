interface HeroIntroProps {
  text: string;
  className: string;
}

export function HeroIntro({ text, className }: HeroIntroProps) {
  return <p className={className}>{text}</p>;
}
