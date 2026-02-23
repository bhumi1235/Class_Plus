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

    try {
        let body;
        if (req.method === "POST") {
            try {
                body = await req.json();
            } catch (e) {
                // No body or invalid json
            }
        }

        const res = await fetch(url, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
                // Pass through auth headers if present in the future
                ...(req.headers.get("Authorization") ? { "Authorization": req.headers.get("Authorization")! } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json().catch(() => ({}));

        // Return response with original status but as JSON
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("[Proxy Error]:", err);
        return NextResponse.json({ success: false, message: "Backend unreachable via proxy" }, { status: 502 });
    }
}
