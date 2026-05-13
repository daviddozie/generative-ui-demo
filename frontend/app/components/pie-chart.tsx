"use client";

import { useEffect, useRef } from "react";
import { PieChartPropsType } from "../schema";

const PALETTE = [
    "#4A90D9",
    "#9B6FD4",
    "#F4A93A",
    "#E85D9B",
    "#2EB87A",
    "#3BBFBF",
    "#E85D5D",
    "#8BC34A",
];

export function PieChart({ title, subtitle, data = [], currency, unit }: PieChartPropsType) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const total = data.reduce((sum, d) => sum + d.value, 0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = canvas.width;
        const cx = size / 2;
        const cy = size / 2;
        const radius = size * 0.42;

        ctx.clearRect(0, 0, size, size);

        let startAngle = -Math.PI / 2;

        data.forEach((segment, i) => {
            const sliceAngle = (segment.value / total) * 2 * Math.PI;
            const color = segment.color || PALETTE[i % PALETTE.length];

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            // White divider between slices
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();

            startAngle += sliceAngle;
        });
    }, [data, total]);

    // Split legend into two columns
    const half = Math.ceil(data.length / 2);
    const col1 = data.slice(0, half);
    const col2 = data.slice(half);

    return (
        <div className="max-w-130 rounded-lg border border-border bg-background p-6">
            {/* Title */}
            <p className="mb-1 text-[18px] font-medium text-foreground">
                {title}
            </p>
            {subtitle && (
                <p className="mb-5 text-[13px] text-muted-foreground">
                    {subtitle}
                </p>
            )}

            {/* Chart */}
            <div className="my-2 mb-6 flex justify-center">
                <canvas
                    ref={canvasRef}
                    width={240}
                    height={240}
                    className="block"
                />
            </div>

            {/* Legend — two column grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[col1, col2].map((col, colIdx) =>
                    col.map((segment, i) => {
                        const globalIdx = colIdx === 0 ? i : half + i;
                        const color = segment.color || PALETTE[globalIdx % PALETTE.length];
                        return (
                            <div key={globalIdx} className="flex items-center gap-2">
                                <div
                                    className="size-3 shrink-0 rounded-full"
                                    style={{ background: color }}
                                />
                                <span className="truncate text-[13px] text-foreground">
                                    {segment.label}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}