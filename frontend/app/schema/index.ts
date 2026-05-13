import * as z from "zod";

export const PieChartProps = z.object({
    title: z.string().describe("Title of the pie chart"),
    subtitle: z.string().optional().describe("Subtitle or description"),
    data: z.array(
        z.object({
            label: z.string().describe("Segment label"),
            value: z.number().describe("Numeric value"),
            color: z.string().optional().describe("Hex color for segment"),
        })
    ).describe("Array of data segments"),
    currency: z.string().optional().describe("Currency symbol e.g. $, £, €"),
    unit: z.string().optional().describe("Unit label e.g. %, kg, hrs"),
});

export const FlightCardProps = z.object({
    airline: z.string().describe("Airline name e.g. Pacific Air"),
    origin: z.object({
        code: z.string().describe("IATA airport code e.g. SFO"),
        city: z.string().optional().describe("City name"),
        time: z.string().describe("Departure time e.g. 08:30"),
    }),
    destination: z.object({
        code: z.string().describe("IATA airport code e.g. JFK"),
        city: z.string().optional().describe("City name"),
        time: z.string().optional().describe("Arrival time"),
    }),
    price: z.number().describe("Ticket price"),
    currency: z.string().default("$").describe("Currency symbol"),
    date: z.string().optional().describe("Flight date"),
    class: z.enum(["Economy", "Premium Economy", "Business", "First"]).optional(),
    stops: z.number().optional().describe("0 = nonstop"),
    status: z.enum(["On Time", "Delayed", "Boarding", "Departed", "Cancelled"]).optional(),
});

export type PieChartPropsType = z.infer<typeof PieChartProps>;
export type FlightCardPropsType = z.infer<typeof FlightCardProps>;