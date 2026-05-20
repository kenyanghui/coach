"""
Generate roadmap - synchronous SSE approach.
"""
import json, time, requests, os, sys
from urllib.parse import urlparse, parse_qs

sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)

API_KEY = os.environ.get("MX_AI_API_KEY", "")
OUTPUT_PATH = "C:/Users/yangh/OneDrive/ClaudeCode/混沌二代教育传承课题/images/roadmap.png"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}
JSON_HEADERS = {**HEADERS, "Content-Type": "application/json"}
SSE_URL = "https://mcp.mxai.cn/sse"

# Get session
sse = requests.get(SSE_URL, headers=HEADERS, stream=True, timeout=30)
it = sse.iter_lines(decode_unicode=True)
session_id = None
for line in it:
    if line and line.startswith("data: "):
        u = line[6:].strip()
        qs = parse_qs(urlparse(u).query)
        if "sessionId" in qs:
            session_id = qs["sessionId"][0]
            break
print(f"Session: {session_id}")
MSG_URL = f"https://mcp.mxai.cn/message?sessionId={session_id}"

def send(method, params=None):
    payload = {"jsonrpc": "2.0", "id": 1, "method": method}
    if params: payload["params"] = params
    return requests.post(MSG_URL, headers=JSON_HEADERS, json=payload, timeout=60)

def recv(timeout=10):
    """Read SSE until we get a data: with JSON or timeout."""
    import select
    start = time.time()
    while time.time() - start < timeout:
        # Check if data available on the SSE connection
        # Use a simple read with timeout approach
        try:
            for line in it:
                if not line: continue
                if line.startswith("data: "):
                    try:
                        d = json.loads(line[6:])
                        return d
                    except: pass
        except:
            pass
        time.sleep(0.1)
    return None

# First, find tool names and models properly
# Let me try tools/list via POST and read SSE
print("\n>>> tools/list")
resp = send("tools/list")
print(f"POST status: {resp.status_code}")
if resp.status_code == 200:
    print(f"Direct response: {resp.text[:300]}")
# Also read from SSE
if resp.status_code == 202:
    print("202 Accepted, reading from SSE...")
    d = recv(8)
    if d:
        print(f"SSE: {json.dumps(d, ensure_ascii=False)[:500]}")

# Try generate_image with model="1" or various seedream names
# The previous error said model = "seedream_5.0_pro" was unrecognized
# But the earlier session managed to generate with seedream models
# Let's try calling with just no model param at all
print("\n>>> generate_image (no model)")
resp = send("generate_image", {
    "prompt": "red apple on white background",
    "width": 1024,
    "height": 1024,
    "image_nums": 1
})
print(f"POST status: {resp.status_code}")
resp_text = resp.text if resp.status_code == 200 else ""
if resp.status_code == 200:
    print(f"Resp: {resp_text[:300]}")
    d = json.loads(resp_text) if resp_text else {}
else:
    d = recv(10)
    if d:
        print(f"SSE: {json.dumps(d, ensure_ascii=False)[:500]}")

# Also check what direct POST to the MCP gives for tools/list
print("\n\n--- Let's also try run.py approach from previous session ---")
# The previous session probably used a simpler HTTP approach
# Let's try calling the generate_image endpoint directly with different model names
for model in ["seedream_5.0_pro", "seedream-5.0-pro", "Seedream 5.0 Pro",
              "seedream5.0pro", "seedream_5.0", "seedream_5", "3.0"]:
    resp = send("generate_image", {
        "model": model,
        "prompt": "test card",
        "width": 512,
        "height": 512,
        "image_nums": 1
    })
    print(f"  model='{model}' -> {resp.status_code} {resp.text[:100]}")
    time.sleep(1)

# Close SSE
sse.close()
print("\nDone")
