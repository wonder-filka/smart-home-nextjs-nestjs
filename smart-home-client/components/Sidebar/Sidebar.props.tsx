import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{
	children: ReactNode;
}