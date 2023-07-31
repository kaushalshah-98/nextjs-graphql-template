import { NextFetchEvent, NextResponse } from 'next/server';
import { envVars } from 'server/config';

export function middleware(req: any, ev: NextFetchEvent) {
  req.session = {};
  if (!envVars.prod) {
    const time = Date.now();
    const timeStr = new Date(time).toLocaleDateString();
    // eslint-disable-next-line no-console
    console.log(`=> URL: ${req?.url} hit at Time: ${timeStr}`);
  }
  return NextResponse.next();
}
