import { checkRateLimit } from '../lib/rate-limit';
import { createAuditLog } from '../lib/audit';
import { prisma } from '../lib/prisma';

async function runTests() {
  console.log('=== RUNNING SECURITY HARDENING VERIFICATION TESTS ===\n');

  try {
    // 1. Verify Rate Limiting
    console.log('1. Testing Database Rate Limiting...');
    const testIp = `test-ip-${Date.now()}`;
    const testEndpoint = 'test_endpoint';
    
    // Simulate 5 requests (limit = 3, window = 10s)
    const results = [];
    for (let i = 0; i < 5; i++) {
      const res = await checkRateLimit(testIp, testEndpoint, 3, 10);
      results.push(res.allowed);
    }
    
    console.log('   Results of 5 requests (Limit = 3):', results);
    if (results[0] && results[1] && results[2] && !results[3] && !results[4]) {
      console.log('   ✅ Rate Limiting Verification: PASSED');
    } else {
      console.error('   ❌ Rate Limiting Verification: FAILED');
    }

    // 2. Verify Audit Logging
    console.log('\n2. Testing Audit Logging...');
    const initialLogCount = await prisma.auditLog.count();
    
    await createAuditLog({
      action: 'SECURITY_TEST_RUN',
      entity: 'SystemTest',
      result: 'SUCCESS',
      ipAddress: '127.0.0.1',
      userAgent: 'SecurityTester',
      details: 'Audit log verification test run'
    });

    const finalLogCount = await prisma.auditLog.count();
    if (finalLogCount === initialLogCount + 1) {
      console.log('   ✅ Audit Log creation Verification: PASSED');
    } else {
      console.error('   ❌ Audit Log creation Verification: FAILED');
    }

    // 3. Clean up test data
    console.log('\n3. Cleaning up test entries...');
    await prisma.rateLimit.deleteMany({
      where: { ip: testIp }
    });
    await prisma.auditLog.deleteMany({
      where: { action: 'SECURITY_TEST_RUN' }
    });
    console.log('   ✅ Test entries cleanup: COMPLETE');
    
    console.log('\n=== ALL SECURITY VERIFICATION TESTS COMPLETED ===');
  } catch (err) {
    console.error('Error during security tests execution:', err);
  }
}

runTests().then(() => process.exit(0));
