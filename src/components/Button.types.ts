export type ButtonVariant = 
  | 'primary' 
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  className?: string;
}