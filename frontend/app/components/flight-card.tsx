"use client";

import { FlightCardPropsType } from "../schema";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
    "On Time":   { bg: "#EAF3DE", text: "#27500A" },
    "Delayed":   { bg: "#FAEEDA", text: "#633806" },
    "Boarding":  { bg: "#EEEDFE", text: "#3C3489" },
    "Departed":  { bg: "#E6F1FB", text: "#0C447C" },
    "Cancelled": { bg: "#FCEBEB", text: "#791F1F" },
};

export function FlightCard({
    airline,
    origin,
    destination,
    price,
    currency = "$",
    date,
    class: cabinClass,
    stops,
    status,
}: FlightCardPropsType) {
    const statusStyle = status ? STATUS_COLORS[status] : null;

    if (!origin || !destination) return null;

    return (
        <div className="max-w-[480px] overflow-hidden rounded-lg border border-border">
            {/* Dark header */}
            <div className="flex items-center justify-between bg-[#1a1a2e] px-5 py-3.5">
                <span className="text-[15px] font-medium text-white">
                    {airline}
                </span>
                <div className="flex items-center gap-2">
                    {statusStyle && status && (
                        <span
                            className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                            style={{ background: statusStyle.bg, color: statusStyle.text }}
                        >
                            {status}
                        </span>
                    )}
                    <span className="text-[13px] text-[#aab0c4]">
                        Flight from {origin.code} to {destination.code}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="bg-background px-5 pt-5">
                {/* Route row */}
                <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div>
                        <p className="m-0 text-[32px] font-bold leading-none tracking-tight text-foreground">
                            {origin.code}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                            {origin.city || "Origin"}
                        </p>
                    </div>

                    <div className="flex w-20 items-center gap-1.5">
                        <div className="flex-1 border-t border-dashed border-border" />
                        <i className="ti ti-plane text-[18px] text-muted-foreground" aria-hidden="true" />
                        <div className="flex-1 border-t border-dashed border-border" />
                    </div>

                    <div className="text-right">
                        <p className="m-0 text-[32px] font-bold leading-none tracking-tight text-foreground">
                            {destination.code}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                            {destination.city || "Destination"}
                        </p>
                    </div>
                </div>

                {/* Departure + Price */}
                <div className="grid grid-cols-2 gap-3 border-b border-border pb-4">
                    <div>
                        <p className="mb-0.5 text-xs text-muted-foreground">Departure</p>
                        <p className="text-xl font-medium text-foreground">
                            {origin.time}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="mb-0.5 text-xs text-muted-foreground">Price</p>
                        <p className="text-xl font-medium text-foreground">
                            {currency}{price?.toLocaleString() ?? 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Optional meta row */}
                {(date || cabinClass || stops !== undefined) && (
                    <div className="flex gap-4 border-b border-border py-2.5">
                        {date && (
                            <div className="flex items-center gap-1.5">
                                <i className="ti ti-calendar text-[13px] text-muted-foreground" aria-hidden="true" />
                                <span className="text-xs text-muted-foreground">{date}</span>
                            </div>
                        )}
                        {cabinClass && (
                            <div className="flex items-center gap-1.5">
                                <i className="ti ti-armchair text-[13px] text-muted-foreground" aria-hidden="true" />
                                <span className="text-xs text-muted-foreground">{cabinClass}</span>
                            </div>
                        )}
                        {stops !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <i className="ti ti-circle-dot text-[13px] text-muted-foreground" aria-hidden="true" />
                                <span className="text-xs text-muted-foreground">
                                    {stops === 0 ? "Nonstop" : stops === 1 ? "1 stop" : `${stops} stops`}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Barcode row */}
                <div className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 38 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-[1px] bg-foreground opacity-85"
                                style={{
                                    width: i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2,
                                    height: i % 7 === 0 ? 28 : 22,
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                        Boarding Pass
                    </span>
                </div>
            </div>
        </div>
    );
}