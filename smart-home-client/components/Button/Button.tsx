import styles from "./Button.module.scss";
import { ButtonProps } from './Button.props';
import cn from 'classnames';

export const Button = ({ appearance, children, className, ...props }: ButtonProps) : JSX.Element => {
	return (
		<button className={cn(styles.button, className, {
			[styles.primary] : appearance == 'primary',
			[styles.ghost] : appearance == 'ghost',
			[styles.secondary] : appearance == 'secondary',
			})}
			{...props}
			>
				{children}
		</button>
	);
};