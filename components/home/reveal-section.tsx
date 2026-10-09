'use client';

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type RevealState = 'idle' | 'pending' | 'visible';
type RevealAnimation = 'fade-in-up' | 'premium-reveal';

const revealAnimationClasses: Record<RevealAnimation, string> = {
  'fade-in-up': 'animate-fade-in-up',
  'premium-reveal': 'animate-premium-reveal',
};

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('idle');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setState('visible');
      return;
    }

    setState('pending');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState('visible');
          observer.unobserve(element);
        }
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.1 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, state };
}

function revealClassName(className: string | undefined, state: RevealState, animation: RevealAnimation) {
  return cn(
    className,
    state === 'pending' && 'opacity-0 translate-y-3',
    state === 'visible' && revealAnimationClasses[animation],
    'motion-reduce:animate-none',
  );
}

export function RevealSection({ className, children, ...props }: ComponentPropsWithoutRef<'section'>) {
  const { ref, state } = useScrollReveal<HTMLElement>();

  return (
    <section
      {...props}
      ref={ref}
      data-reveal-state={state}
      className={cn('group/reveal', revealClassName(className, state, 'fade-in-up'))}
    >
      {children}
    </section>
  );
}

type ScrollRevealProps = ComponentPropsWithoutRef<'div'> & {
  animation?: RevealAnimation;
};

export function ScrollReveal({
  animation = 'fade-in-up',
  className,
  children,
  ...props
}: ScrollRevealProps) {
  const { ref, state } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      {...props}
      ref={ref}
      data-reveal-state={state}
      className={cn('group/reveal', revealClassName(className, state, animation))}
      data-reveal-animation={animation}
    >
      {children}
    </div>
  );
}
