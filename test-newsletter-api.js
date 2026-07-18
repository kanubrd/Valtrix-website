/**
 * Test Newsletter API
 * Tests the /api/newsletter endpoint locally
 * 
 * Usage: node test-newsletter-api.js
 */

async function testNewsletterAPI() {
  console.log('\n🧪 Testing Newsletter API...\n');
  
  const testData = {
    email: 'test@example.com',
    _hp: '', // Honeypot should be empty for legitimate requests
  };

  try {
    console.log('⏳ Sending test request to http://localhost:3000/api/newsletter ...');
    console.log('📤 Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/newsletter', {
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
      console.log('\n✅ SUCCESS! Newsletter API is working!');
      console.log('📧 Check your email for welcome message at:', testData.email);
    } else {
      console.log('\n❌ FAILED! API returned an error.');
      console.log('Error:', data.error || 'Unknown error');
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
testNewsletterAPI().catch(console.error);