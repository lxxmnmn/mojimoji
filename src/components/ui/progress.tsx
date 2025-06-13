'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value: number;
  onComplete?: () => void;
}

function Progress({ className, value, onComplete, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator asChild>
        <motion.div
          className="bg-primary h-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (onComplete && value === 100) onComplete();
          }}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
