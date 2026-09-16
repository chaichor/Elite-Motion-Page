'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ElementType } from 'react';
import { isLiteMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface KineticTextProps {
  /** Use "\n" to force a line break. */
  text: string;
  /** Substring painted in the accent colour. */
  highlight?: string;
  /** Overrides the class applied to the highlighted substring. */
  highlightClassName?: string;
  as?: ElementType;
  className?: string;
  /** Keep the settled word gently undulating. */
  loop?: boolean;
  /** How far apart the characters start, in em. */
  spread?: number;
  style?: CSSProperties;
}

type Char = { char: string; accent: boolean };

function buildLines(text: string, highlight?: string): Char[][] {
  const start = highlight ? text.indexOf(highlight) : -1;
  const end = start >= 0 ? start + highlight!.length : -1;

  let cursor = 0;
  return text.split('\n').map((line) => {
    const chars = Array.from(line).map((char, i) => ({
      char,
      accent: start >= 0 && cursor + i >= start && cursor + i < end,
    }));
    cursor += line.length + 1;
    return chars;
  });
}

/**
 * Characters land from a spread-out ghost state into the tight-set word, then
 * keep a low-amplitude wave running so the headline never sits completely
 * still. Replays whenever the heading is hovered.
 */
export function KineticText({
  text,
  highlight,
  highlightClassName = 'em-gradient-text',
  as: Tag = 'h2',
  className,
  loop = true,
  spread = 0.55,
  style,
}: KineticTextProps) {
  const hostRef = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  const lines = buildLines(text, highlight);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (isLiteMotion()) {
      setOn(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setOn(true);
        io.disconnect();
      },
      { threshold: 0.2 }
    );

    io.observe(host);
    return () => io.disconnect();
  }, []);

  let charIndex = 0;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={hostRef as any}
      className={cn('em-kinetic', className)}
      data-on={on ? 'true' : 'false'}
      data-loop={loop ? 'true' : 'false'}
      style={style}
      aria-label={text.replace(/\n/g, ' ')}
    >
      {lines.map((line, lineIndex) => {
        // Characters are inline-blocks, which each offer a break opportunity —
        // so words get their own nowrap box and the line only wraps at spaces.
        const words: Char[][] = [[]];
        line.forEach((entry) => {
          if (entry.char === ' ') words.push([]);
          else words[words.length - 1].push(entry);
        });

        let inLine = -1;

        return (
          <span className="em-kinetic-line" key={lineIndex} aria-hidden="true">
            {words.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                {wordIndex > 0 && ' '}
                <span className="em-kinetic-word">
                  {word.map(({ char, accent }, i) => {
                    const index = charIndex++;
                    inLine++;
                    const fromCenter = inLine - (line.length - 1) / 2;

                    return (
                      <span
                        key={i}
                        className={cn('em-kinetic-char', accent && highlightClassName)}
                        style={
                          {
                            '--em-k-delay': `${index * 26}ms`,
                            '--em-k-loop-delay': `${index * 90}ms`,
                            '--em-k-x': `${fromCenter * spread}em`,
                            '--em-k-tilt': `${fromCenter * 2.2}deg`,
                          } as CSSProperties
                        }
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              </Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

export default KineticText;
