const mockApiResponse = {
  success: true,
  message: 'User data retrieved successfully',
  data: {
    user: {
      id: '123',
      name: 'Test User',
      email: 'test@example.com'
    }
  }
};

function testMapping(response) {
  // Logic from AuthProvider and LoginPage
  const user = response.data?.user || response.user;
  
  console.log('Testing mapping logic...');
  console.log('Response:', JSON.stringify(response, null, 2));
  console.log('Resulting user:', user);
  
  if (user && user.id === '123') {
    console.log('SUCCESS: User correctly mapped');
    return true;
  } else {
    console.log('FAILURE: User mapping failed');
    return false;
  }
}

testMapping(mockApiResponse);
