import { Suspense, type ComponentType } from 'react';
import { useLazyMount } from '../hooks/useLazyMount';

interface DeferredSectionProps {
  component: ComponentType;
  minHeight?: string;
  rootMargin?: string;
}

export default function DeferredSection({
  component: Component,
  minHeight = '40vh',
  rootMargin = '600px 0px',
}: DeferredSectionProps) {
  const { ref, mounted } = useLazyMount(rootMargin);

  return (
    <div ref={ref} className="cv-auto" style={{ minHeight: mounted ? undefined : minHeight }}>
      {mounted ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden />}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  );
}
