import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  value: string; // e.g. "100+", "3rd", "5+", "99.9%"
  duration?: number;
}

export default function CountUp({ value, duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse value details
    if (value === '3rd') {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= 3) {
          setDisplayValue('3rd');
          clearInterval(interval);
        } else {
          setDisplayValue(`${start}st`);
        }
      }, 300);
      return () => clearInterval(interval);
    }

    if (value.includes('%')) {
      const target = parseFloat(value);
      const startTime = performance.now();
      const frame = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = (easeOut * target).toFixed(1);
        setDisplayValue(`${current}%`);
        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          setDisplayValue(value);
        }
      };
      requestAnimationFrame(frame);
      return;
    }

    if (value.includes('+')) {
      const target = parseInt(value, 10);
      const startTime = performance.now();
      const frame = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        setDisplayValue(`${current}+`);
        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          setDisplayValue(value);
        }
      };
      requestAnimationFrame(frame);
      return;
    }

    // Default numeric animation
    const target = parseFloat(value) || 0;
    const startTime = performance.now();
    const frame = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      setDisplayValue(`${current}`);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayValue(value);
      }
    };
    requestAnimationFrame(frame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
