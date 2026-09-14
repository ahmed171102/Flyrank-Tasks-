const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const app = require('../index.js');

function request(server, method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        method,
        path,
        port: server.address().port,
        headers: data
          ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
          : {}
      },
      (res) => {
        let chunks = '';
        res.on('data', (c) => (chunks += c));
        res.on('end', () => {
          let parsed = null;
          try {
            parsed = chunks ? JSON.parse(chunks) : null;
          } catch {
            parsed = chunks;
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

test('GET /health returns ok', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const res = await request(server, 'GET', '/health');
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('GET /tasks returns seeded tasks', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const res = await request(server, 'GET', '/tasks');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length >= 3);
});

test('POST /tasks requires a title', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const res = await request(server, 'POST', '/tasks', {});
  assert.equal(res.status, 400);
});

test('full CRUD lifecycle for a task', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const created = await request(server, 'POST', '/tasks', { title: 'Write tests' });
  assert.equal(created.status, 201);
  const id = created.body.id;

  const updated = await request(server, 'PUT', `/tasks/${id}`, { done: true });
  assert.equal(updated.status, 200);
  assert.equal(updated.body.done, true);

  const deleted = await request(server, 'DELETE', `/tasks/${id}`);
  assert.equal(deleted.status, 204);

  const missing = await request(server, 'GET', `/tasks/${id}`);
  assert.equal(missing.status, 404);
});
