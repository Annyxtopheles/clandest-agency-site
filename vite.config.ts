import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import chatHandler from './api/chat';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  if (env.VITE_GEMINI_API_KEY) process.env.VITE_GEMINI_API_KEY = env.VITE_GEMINI_API_KEY;

  return {
    base: './',
    plugins: [
      react(),
      {
        name: 'api-chat-dev-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => { body += chunk; });
              req.on('end', async () => {
                try {
                  const parsedBody = body ? JSON.parse(body) : {};
                  const mockReq = { method: 'POST', body: parsedBody };
                  const mockRes = {
                    setHeader: (k: string, v: string) => res.setHeader(k, v),
                    status: (code: number) => {
                      res.statusCode = code;
                      return {
                        json: (data: any) => {
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify(data));
                        },
                        end: () => res.end()
                      };
                    }
                  };
                  await chatHandler(mockReq, mockRes);
                } catch (e: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: e?.message || 'Server error' }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  };
});

