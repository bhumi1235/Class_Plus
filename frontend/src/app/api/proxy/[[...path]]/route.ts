import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://13.60.13.116:5000";

export async function GET(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    return handleRequest(req, params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    return handleRequest(req, params);
}

async function handleRequest(req: NextRequest, paramsPromise: Promise<{ path?: string[] }>) {
    const { path } = await paramsPromise;
    const fullPath = path ? path.join("/") : "";
    const searchParams = req.nextUrl.searchParams.toString();
    const url = `${BACKEND_URL}/${fullPath}${searchParams ? '?' + searchParams : ''}`;

    // Add a 30 second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
        let body;
        if (req.method === "POST") {
            try {
                // Read body as text first to handle potential empty or non-JSON bodies safely
                const text = await req.text();
                body = text ? text : undefined;
            } catch (e) {
                // No body or invalid
            }
        }

        const res = await fetch(url, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
                ...(req.headers.get("Authorization") ? { "Authorization": req.headers.get("Authorization")! } : {}),
            },
            body: body,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            console.error("[Proxy Timeout]:", url);
            return NextResponse.json({ success: false, message: "Backend response timeout" }, { status: 504 });
        }
        console.error("[Proxy Error]:", err);
        return NextResponse.json({ success: false, message: "Backend unreachable via proxy" }, { status: 502 });
    }
}
