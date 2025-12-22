'use client';

import type { ComponentProps, ReactNode } from 'react';
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  AreaChart as RechartsAreaChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { CartesianGridProps, TooltipProps, XAxisProps, YAxisProps } from 'recharts';

/**
 * Chart Wrapper Components
 *
 * Provides consistent styling for all Recharts components with theme-aware colors.
 * All chart components use CSS variables for dynamic theming.
 */

// Default chart configuration with theme colors
const defaultAxisStyle: XAxisProps['style'] = {
  fontSize: '12px',
};

const defaultTooltipStyle: TooltipProps<number | string, string>['contentStyle'] = {
  backgroundColor: 'var(--app-surface)',
  border: '1px solid var(--app-border)',
  borderRadius: '8px',
  color: 'var(--app-text)',
};

const defaultGridStroke = 'var(--app-border)';
const defaultAxisStroke = 'var(--app-text-muted)';

// Re-export Recharts components with consistent naming
export { ResponsiveContainer, Bar, Line, Area, Pie, Cell, Legend };

// Custom Axis components with default styling
export function ChartXAxis({ stroke = defaultAxisStroke, style = defaultAxisStyle, ...props }: XAxisProps) {
  return <XAxis stroke={stroke} style={style} {...props} />;
}

export function ChartYAxis({ stroke = defaultAxisStroke, style = defaultAxisStyle, ...props }: YAxisProps) {
  return <YAxis stroke={stroke} style={style} {...props} />;
}

// Custom Grid with default styling
export function ChartGrid({ strokeDasharray = '3 3', stroke = defaultGridStroke, ...props }: CartesianGridProps) {
  return <CartesianGrid strokeDasharray={strokeDasharray} stroke={stroke} {...props} />;
}

// Custom Tooltip with theme styling
export function ChartTooltip({ contentStyle = defaultTooltipStyle, ...props }: TooltipProps<number | string, string>) {
  return <Tooltip contentStyle={contentStyle} {...props} />;
}

export type ChartDatum = Record<string, string | number | boolean | null | undefined | Date>;

export type ChartMargin = { top?: number; right?: number; bottom?: number; left?: number };

type BarChartBaseProps = Omit<ComponentProps<typeof RechartsBarChart>, 'data' | 'width' | 'height' | 'children'>;
type LineChartBaseProps = Omit<ComponentProps<typeof RechartsLineChart>, 'data' | 'width' | 'height' | 'children'>;
type AreaChartBaseProps = Omit<ComponentProps<typeof RechartsAreaChart>, 'data' | 'width' | 'height' | 'children'>;
type PieChartBaseProps = Omit<ComponentProps<typeof RechartsPieChart>, 'width' | 'height' | 'children'>;

// Bar Chart wrapper
export interface BarChartProps extends BarChartBaseProps {
  data: ChartDatum[];
  children: ReactNode;
  width?: string | number;
  height?: number;
  margin?: ChartMargin;
}

export function BarChart({ data, children, width = '100%', height = 300, margin, ...props }: BarChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsBarChart data={data} margin={margin} {...props}>
        {children}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// Line Chart wrapper
export interface LineChartProps extends LineChartBaseProps {
  data: ChartDatum[];
  children: ReactNode;
  width?: string | number;
  height?: number;
  margin?: ChartMargin;
}

export function LineChart({ data, children, width = '100%', height = 300, margin, ...props }: LineChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsLineChart data={data} margin={margin} {...props}>
        {children}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

// Area Chart wrapper
export interface AreaChartProps extends AreaChartBaseProps {
  data: ChartDatum[];
  children: ReactNode;
  width?: string | number;
  height?: number;
  margin?: ChartMargin;
}

export function AreaChart({ data, children, width = '100%', height = 300, margin, ...props }: AreaChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsAreaChart data={data} margin={margin} {...props}>
        {children}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

// Pie Chart wrapper
export interface PieChartProps extends PieChartBaseProps {
  children: ReactNode;
  width?: string | number;
  height?: number;
}

export function PieChart({ children, width = '100%', height = 300, ...props }: PieChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsPieChart {...props}>
        {children}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
