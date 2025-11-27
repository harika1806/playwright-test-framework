import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

type NetworkLogs = {
  url: string;
  method: string;
  headers: Record<string, string>;
  postData: string | null;
  status?: number;
  responseHeaders?: Record<string, string>;
  body?: string | null;
  timestamp: string;
};

export const test = base.extend<{ networkLogs: NetworkLogs[] }>({
//export const collectNetworkLogs = {
  networkLogs: async ({ page }, use, testInfo) => {

    console.log(`[collect-network] Starting network log collection for test: ${testInfo.retry}`);
    
    // Skip network logging for retries
    if (testInfo.retry > 0) {
      console.log('[collect-network] Skipping network logs for retry');
      await use([]); // Provide empty logs
      return;
    }

    
    const networkLogs: NetworkLogs[] = [];
    const requestMap = new Map<string, NetworkLogs>();
    
   // Capture requests
    page.on('request', (req) => {
      if (!req.url().startsWith('https://www.saucedemo.com')) return;

      const log: NetworkLogs = {
        url: req.url(),
        method: req.method(),
        headers: req.headers(),
        postData: req.postData() ?? null,
        timestamp: new Date().toISOString(),
      };
      requestMap.set(req.url(), log);
      networkLogs.push(log);
    });

  // Capture responses and pair with request
    page.on('response', async (res) => {
      if (!res.url().startsWith('https://www.saucedemo.com')) return;

      const log = requestMap.get(res.url());
      if (log) {
        log.status = res.status();
        log.responseHeaders = res.headers();
        try {
          let body = await res.text();
          if (body && body.length > 10000) {
            body = body.slice(0, 100) + '...[truncated]';
          }          
          log.body = body;
                  } catch {
                    log.body = '<unable to read body>';
                  }
                }
              });

    try{
        console.log('Collecting network logs...') 
        await use(networkLogs);
    } finally{
        console.log(`[collect-network] status=${testInfo.status}, logs=${networkLogs.length}, Test case=${testInfo.title}`);
    }
    
    // Only attach network logs when test failed to save storage
    if (testInfo.status !== 'passed') {
      const filePath = testInfo.outputPath(`network-logs-${testInfo.title}.json`);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, JSON.stringify({ networkLogs }, null, 2), 'utf-8');
      // helpful console logs for debugging where the file is written and that it's attached
      console.log(`[collect-networklogs] wrote network log to ${filePath}`);

      await testInfo.attach('network-logs.json', {
        path: filePath,
        contentType: 'application/json',
      });
      console.log('[collect-networklogs] attached network-logs.json to test attachments');
    }
  },
});

export { expect } from '@playwright/test';
