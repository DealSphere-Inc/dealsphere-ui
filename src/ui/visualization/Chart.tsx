'use client';

import { ReactNode } from 'react';
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

/**
 * Chart Wrapper Components
 *
 * Provides consistent styling for all Recharts components with theme-aware colors.
 * All chart components use CSS variables for dynamic theming.
 */

// Default chart configuration with theme colors
const defaultAxisStyle = {
  fontSize: '12px',
};

const defaultTooltipStyle = {
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
export function ChartXAxis({ stroke = defaultAxisStroke, style = defaultAxisStyle, ...props }: any) {
  return <XAxis stroke={stroke} style={style} {...props} />;
}

export function ChartYAxis({ stroke = defaultAxisStroke, style = defaultAxisStyle, ...props }: any) {
  return <YAxis stroke={stroke} style={style} {...props} />;
}

// Custom Grid with default styling
export function ChartGrid({ strokeDasharray = '3 3', stroke = defaultGridStroke, ...props }: any) {
  return <CartesianGrid strokeDasharray={strokeDasharray} stroke={stroke} {...props} />;
}

// Custom Tooltip with theme styling
export function ChartTooltip({ contentStyle = defaultTooltipStyle, ...props }: any) {
  return <Tooltip contentStyle={contentStyle} {...props} />;
}

// Bar Chart wrapper
export interface BarChartProps {
  data: any[];
  children: ReactNode;
  width?: string | number;
  height?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
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
export interface LineChartProps {
  data: any[];
  children: ReactNode;
  width?: string | number;
  height?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
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
export interface AreaChartProps {
  data: any[];
  children: ReactNode;
  width?: string | number;
  height?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
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
export interface PieChartProps {
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
