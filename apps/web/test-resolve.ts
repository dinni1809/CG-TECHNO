async function testResolve() {
  try {
    const pkgPath = require.resolve('@react-email/render');
    console.log('Resolved path:', pkgPath);
    
    const mod = await import('@react-email/render');
    console.log('Module exports:', Object.keys(mod));
    console.log('Type of default export:', typeof (mod as any).default);
    console.log('Type of render:', typeof (mod as any).render);
    console.log('Type of renderAsync:', typeof (mod as any).renderAsync);
  } catch (error: any) {
    console.error('Error during resolution:', error.message || error);
  }
}

testResolve();
