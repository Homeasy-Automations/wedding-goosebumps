import assert from "assert";

// This is a simple integration test script intended to be run against a local running server.
// Usage: npx tsx tests/integration.ts

const BASE_URL = "https://www.weddinggoosebumps.com";

async function runTests() {
  console.log("Starting integration tests...");
  let passed = 0;
  let failed = 0;

  const assertEqual = (actual: any, expected: any, testName: string) => {
    try {
      assert.strictEqual(actual, expected);
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } catch (e: any) {
      console.error(`❌ [FAIL] ${testName}`);
      console.error(`   Expected ${expected} but got ${actual}`);
      failed++;
    }
  };

  try {
    // 1. Test Lead Submission Endpoint
    const leadRes = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Lead",
        email: "test@example.com",
        phone: "1234567890",
        message: "Hello this is a test lead.",
      }),
    });
    assertEqual(leadRes.status, 200, "Lead submission endpoint returns 200 OK");
    const leadData = await leadRes.json();
    assertEqual(leadData.success, true, "Lead submission returns success flag");

    // 2. Test RBAC (Unauthorized access without session)
    const pageRes = await fetch(`${BASE_URL}/api/pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test", slug: "/test" })
    });
    assertEqual(pageRes.status, 401, "RBAC: API returns 401 Unauthorized for unauthenticated POST");

    // 3. Test API GET for SEO
    const seoRes = await fetch(`${BASE_URL}/api/seo`);
    assertEqual(seoRes.status, 401, "RBAC: API returns 401 Unauthorized for unauthenticated GET");

    console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("Test execution failed. Is the server running on http://localhost:3000 ?");
    console.error(error);
    process.exit(1);
  }
}

runTests();
