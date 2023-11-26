import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface MenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{
	children: ReactNode;
}