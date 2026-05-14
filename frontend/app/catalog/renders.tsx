'use client';

import React from "react";
import {
    PieChart as RechartsPie,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart as RechartsBar,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import {
    createCatalog,
    type CatalogRenderers,
} from "@copilotkit/a2ui-renderer";
import {
    demonstrationCatalogDefinitions,
    type DemonstrationCatalogDefinitions,
} from "./definitions";

function resolveText(value: unknown): string {
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && "path" in value)
        return String((value as { path: string }).path);
    return String(value ?? "");
}

// ─── Renderers (type-checked against schema definitions) ────────────

const demonstrationCatalogRenderers: CatalogRenderers<DemonstrationCatalogDefinitions> =
{
    Title: ({ props }) => {
        const Tag = (
            props.level === "h1" ? "h1" : props.level === "h3" ? "h3" : "h2"
        ) as "h1" | "h2" | "h3";
        const sizeClass: Record<string, string> = {
            h1: "text-[1.75rem]",
            h2: "text-[1.25rem]",
            h3: "text-[1rem]",
        };
        return (
            <Tag className={`m-0 font-semibold tracking-tight text-gray-900 ${sizeClass[props.level ?? "h2"]}`}>
                {resolveText(props.text)}
            </Tag>
        );
    },

    Text: ({ props }) => {
        const variantClass: Record<string, string> = {
            h1: "text-2xl font-bold text-gray-900",
            h2: "text-xl font-bold text-gray-900",
            h3: "text-base font-semibold text-gray-700",
            body: "text-sm text-gray-700",
            caption: "text-xs text-gray-500",
        };
        return (
            <span className={variantClass[props.variant ?? "body"]}>
                {resolveText(props.text)}
            </span>
        );
    },

    Icon: ({ props }) => (
        <span
            className="material-symbols-outlined text-gray-500"
            style={{ fontSize: props.size ?? 24 }}
        >
            {props.name}
        </span>
    ),

    Image: ({ props }) => (
        <img
            src={resolveText(props.src)}
            alt={resolveText(props.alt ?? "")}
            className="max-w-full rounded-lg"
            style={{
                width: props.width ?? "auto",
                height: props.height ?? "auto",
            }}
        />
    ),

    Divider: () => (
        <hr className="border-none border-t border-gray-200 my-1" />
    ),

    Card: ({ props, children }) => (
        <div className="bg-white rounded-xl border! border-gray-200! p-4 shadow-sm">
            {typeof props.child === "string" && children(props.child)}
        </div>
    ),

    List: ({ props, children }) => {
        const items = Array.isArray(props.children) ? props.children : [];
        const isHorizontal = (props as any).direction === "horizontal";
        return (
            <div
                className={`flex ${isHorizontal ? "flex-row overflow-x-auto flex-nowrap" : "flex-col"}`}
                style={{ gap: props.gap ?? 8 }}
            >
                {items.map((item: any, i: number) => {
                    if (typeof item === "string")
                        return <React.Fragment key={`${item}-${i}`}>{children(item)}</React.Fragment>;
                    if (item && typeof item === "object" && "id" in item)
                        return (
                            <div
                                key={`${item.id}-${i}`}
                                className={isHorizontal ? "shrink-0 min-w-70" : undefined}
                            >
                                {(children as any)(item.id, item.basePath)}
                            </div>
                        );
                    return null;
                })}
            </div>
        );
    },

    Tabs: ({ props, children }) => {
        const [active, setActive] = React.useState(0);
        const tabs = props.tabs ?? [];
        return (
            <div>
                <div className="flex border-b border-gray-200">
                    {tabs.map((tab: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`px-4 py-2 text-sm cursor-pointer bg-transparent border-none border-b-2 transition-colors ${
                                active === i
                                    ? "font-semibold text-gray-900 border-b-gray-900"
                                    : "font-normal text-gray-500 border-b-transparent"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="py-3">
                    {tabs[active] && children(tabs[active].child)}
                </div>
            </div>
        );
    },

    Row: ({ props, children }) => {
        const justifyClass: Record<string, string> = {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            spaceBetween: "justify-between",
        };
        const items = Array.isArray(props.children) ? props.children : [];
        return (
            <div
                className={`flex flex-row flex-wrap w-full ${justifyClass[props.justify ?? "start"] ?? "justify-start"}`}
                style={{ gap: `${props.gap ?? 16}px`, alignItems: props.align ?? "stretch" }}
            >
                {items.map((item: any, i: number) => {
                    if (typeof item === "string")
                        return (
                            <div key={`${item}-${i}`} className="flex-1 min-w-0">
                                {children(item)}
                            </div>
                        );
                    if (item && typeof item === "object" && "id" in item)
                        return (
                            <div key={`${item.id}-${i}`} className="flex-1 min-w-0">
                                {(children as any)(item.id, item.basePath)}
                            </div>
                        );
                    return null;
                })}
            </div>
        );
    },

    Column: ({ props, children }) => {
        const items = Array.isArray(props.children) ? props.children : [];
        return (
            <div
                className="flex flex-col w-full"
                style={{ gap: `${props.gap ?? 12}px` }}
            >
                {items.map((item: any, i: number) => {
                    if (typeof item === "string")
                        return (
                            <React.Fragment key={`${item}-${i}`}>
                                {children(item)}
                            </React.Fragment>
                        );
                    if (item && typeof item === "object" && "id" in item)
                        return (
                            <React.Fragment key={`${item.id}-${i}`}>
                                {(children as any)(item.id, item.basePath)}
                            </React.Fragment>
                        );
                    return null;
                })}
            </div>
        );
    },

    DashboardCard: ({ props, children }) => (
        <div className="bg-white rounded-xl border! border-gray-200! p-5 shadow-sm flex flex-col gap-3">
            <div>
                <div className="font-semibold text-[0.9rem] text-gray-900">
                    {resolveText(props.title)}
                </div>
                {props.subtitle && (
                    <div className="text-xs text-gray-500 mt-0.5">
                        {resolveText(props.subtitle)}
                    </div>
                )}
            </div>
            {typeof props.child === "string" && children(props.child)}
        </div>
    ),

    Metric: ({ props }) => {
        const trendClass: Record<string, string> = {
            up: "text-emerald-600",
            down: "text-red-600",
            neutral: "text-gray-500",
        };
        const trendIcons: Record<string, string> = {
            up: "↑",
            down: "↓",
            neutral: "→",
        };
        return (
            <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm w-full">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {resolveText(props.label)}
                </span>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 tracking-tight">
                        {resolveText(props.value)}
                    </span>
                    {props.trend && props.trendValue && (
                        <span className={`text-sm font-medium ${trendClass[props.trend] ?? "text-gray-500"}`}>
                            {trendIcons[props.trend]} {resolveText(props.trendValue)}
                        </span>
                    )}
                </div>
            </div>
        );
    },

    PieChart: ({ props }) => {
        const COLORS = [
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
            "#f59e0b",
            "#10b981",
            "#6366f1",
        ];
        const data = props.data ?? [];
        return (
            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            innerRadius={props.innerRadius ?? 40}
                            outerRadius={80}
                            paddingAngle={2}
                        >
                            {data.map((entry: any, i: number) => (
                                <Cell
                                    key={i}
                                    fill={entry.color ?? COLORS[i % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </RechartsPie>
                </ResponsiveContainer>
            </div>
        );
    },

    BarChart: ({ props }) => {
        const data = props.data ?? [];
        return (
            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBar data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6b7280" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                        <Tooltip />
                        <Bar
                            dataKey="value"
                            fill={props.color ?? "#3b82f6"}
                            radius={[4, 4, 0, 0]}
                        />
                    </RechartsBar>
                </ResponsiveContainer>
            </div>
        );
    },

    Badge: ({ props }) => {
        const variantClass: Record<string, string> = {
            success: "bg-green-100 text-green-800",
            warning: "bg-yellow-100 text-yellow-800",
            error: "bg-red-100 text-red-700",
            info: "bg-blue-100 text-blue-800",
            neutral: "bg-gray-100 text-gray-700",
        };
        return (
            <span
                className={`inline-block px-2 py-0.5 rounded-full text-[0.7rem] font-medium ${variantClass[props.variant ?? "neutral"] ?? variantClass.neutral}`}
            >
                {resolveText(props.text)}
            </span>
        );
    },

    DataTable: ({ props }) => {
        const cols = props.columns ?? [];
        const rows = props.rows ?? [];
        return (
            <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse text-[0.8rem]">
                    <thead>
                        <tr>
                            {cols.map((col: any) => (
                                <th
                                    key={col.key}
                                    className="text-left px-3 py-2 border-b-2 border-gray-200 text-gray-500 font-semibold text-[0.7rem] uppercase tracking-wide"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row: any, i: number) => (
                            <tr key={i} className="border-b border-gray-100">
                                {cols.map((col: any) => (
                                    <td key={col.key} className="px-3 py-2 text-gray-700">
                                        {String(row[col.key] ?? "")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },

    Button: ({ props, children, dispatch }) => {
        const variantClass: Record<string, string> = {
            primary: "bg-gray-900 text-white border-none",
            secondary: "bg-white text-gray-700 border border-gray-300",
            ghost: "bg-transparent text-blue-500 border-none",
        };
        return (
            <button
                className={`w-full px-4 py-2 rounded-lg text-[0.8rem] font-medium cursor-pointer transition-opacity hover:opacity-80 ${variantClass[props.variant ?? "primary"] ?? variantClass.primary}`}
                onClick={() => dispatch?.(props.action)}
            >
                {typeof props.child === "string" ? children(props.child) : (props as any).label ?? null}
            </button>
        );
    },
};

// Assembled Catalog 

export const demonstrationCatalog = createCatalog(
    demonstrationCatalogDefinitions,
    demonstrationCatalogRenderers,
    {
        catalogId: "copilotkit://app-dashboard-catalog",
        includeBasicCatalog: false,
    },
);