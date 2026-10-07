/** Infinite horizontal marquee; content is duplicated for a seamless loop. */
export default function Marquee({
  items,
  className = "",
  speed = 30,
}: {
  items: readonly string[];
  className?: string;
  speed?: number;
}) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 whitespace-nowrap font-display text-[clamp(1.2rem,3vw,2.2rem)] font-medium uppercase tracking-tight"
        >
          {item}
          <span className="text-accent">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee relative w-full overflow-hidden ${className}`}
      style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
