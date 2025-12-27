export type ColorScheme = 'blue' | 'green' | 'yellow' | 'purple';

export const colorStyles: Record<ColorScheme, { 
  card: string; 
  icon: string; 
  iconHover: string;
  bg: string;
  text: string;
  border: string;
}> = {
  blue: {
    card: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/30',
    icon: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    iconHover: 'group-hover:bg-blue-500 group-hover:text-white',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200/50 dark:border-blue-800/30'
  },
  green: {
    card: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/30',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    iconHover: 'group-hover:bg-emerald-500 group-hover:text-white',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200/50 dark:border-emerald-800/30'
  },
  yellow: {
    card: 'bg-gradient-to-br from-amber-50 to-yellow-100/50 dark:from-amber-950/30 dark:to-yellow-900/20 border-amber-200/50 dark:border-amber-800/30',
    icon: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    iconHover: 'group-hover:bg-amber-500 group-hover:text-white',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200/50 dark:border-amber-800/30'
  },
  purple: {
    card: 'bg-gradient-to-br from-violet-50 to-purple-100/50 dark:from-violet-950/30 dark:to-purple-900/20 border-violet-200/50 dark:border-violet-800/30',
    icon: 'bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400',
    iconHover: 'group-hover:bg-violet-500 group-hover:text-white',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-200/50 dark:border-violet-800/30'
  }
};
