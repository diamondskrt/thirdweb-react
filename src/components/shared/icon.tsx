type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className}>
      <use xlinkHref={`/assets/sprite.svg#${name}`} />
    </svg>
  );
}
