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
        const body = req.method !== "GET" ? await req.text() : undefined;

        // Forward ALL headers except 'host' to avoid ssl/routing errors
        const headers = new Headers();
        req.headers.forEach((value, key) => {
            if (key.toLowerCase() !== "host") {
                headers.set(key, value);
            }
        });

        const res = await fetch(url, {
            method: req.method,
            headers: headers,
            body: body,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Try to parse as JSON, if fails return text
        const text = await res.text();
        try {
            const data = JSON.parse(text);
            return NextResponse.json(data, { status: res.status });
        } catch (e) {
            return new NextResponse(text, {
                status: res.status,
                headers: { "Content-Type": res.headers.get("Content-Type") || "text/plain" }
            });
        }
    } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            return NextResponse.json({ success: false, message: "Backend response timeout" }, { status: 504 });
        }
        console.error("[Proxy Error]:", err);
        return NextResponse.json({ success: false, message: "Backend unreachable via proxy" }, { status: 502 });
    }
}
