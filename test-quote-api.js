/**
 * Test Quote Form API
 * Tests the /api/quote endpoint locally
 * 
 * Usage: node test-quote-api.js
 */

async function testQuoteAPI() {
  console.log('\n🧪 Testing Quote Form API...\n');
  
  const testData = {
    name: 'Test User',
    company: 'Test Company Inc.',
    email: 'test@example.com',
    products: ['SusPol-125', 'VAMShield-90'],
    material: 'Need bulk quantities for industrial application. Testing quote system.',
    _hp: '', // Honeypot should be empty for legitimate requests
  };

  try {
    console.log('⏳ Sending test request to http://localhost:3000/api/quote ...');
    console.log('📤 Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000', // Required for CSRF check
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', // Required by middleware
      },
      body: JSON.stringify(testData),
    });

    console.log('\n📥 Response Status:', response.status, response.statusText);
    
    const data = await response.json();
    console.log('📥 Response Data:', JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log('\n✅ SUCCESS! Quote form API is working!');
      console.log('📧 Check your email at:', process.env.COMPANY_EMAIL || 'info@valtrixmaterials.com');
    } else {
      console.log('\n❌ FAILED! API returned an error.');
      console.log('Error:', data.error || 'Unknown error');
      if (data.errors) {
        console.log('Validation Errors:', data.errors);
      }
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log('\n📝 TROUBLESHOOTING:');
    console.log('1. Make sure the development server is running: npm run dev');
    console.log('2. Check that the server is accessible at http://localhost:3000');
    console.log('3. Check the terminal running "npm run dev" for error messages');
  }
}

// Run the test
testQuoteAPI().catch(console.error);