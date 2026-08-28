import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** shadcn 惯例的类名合并:条件类 + Tailwind 冲突消解。 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
