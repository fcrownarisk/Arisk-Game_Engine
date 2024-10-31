// Simulating an API call to fetch user data
async function fetchUserData(userId) {
    console.log(`Fetching data for user ${userId}...`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulated user data
    const userData = {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@example.com`
    };
    
    console.log(`Data fetched for user ${userId}`);
    return userData;
  }
  
  // Function to process user data
  async function processUserData(userData) {
    console.log(`Processing data for ${userData.name}...`);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const processedData = {
      ...userData,
      lastProcessed: new Date().toISOString()
    };
    
    console.log(`Data processed for ${userData.name}`);
    return processedData;
  }
  
  // Main function that uses await and includes async functions
  async function getUserInfo(userId) {
    try {
      console.log(`Starting to get info for user ${userId}`);
      
      // Await the async function fetchUserData
      const userData = await fetchUserData(userId);
      
      // Await the async function processUserData
      const processedData = await processUserData(userData);
      
      console.log("User info retrieved and processed successfully");
      return processedData;
    } catch (error) {
      console.error("Error in getUserInfo:", error);
      throw error;
    }
  }
  
  // Function to demonstrate the use of getUserInfo
  async function demonstrateAsyncAwait() {
    console.log("Starting demonstration of async/await");
    
    try {
      const userInfo = await getUserInfo(123);
      console.log("Final user info:", userInfo);
    } catch (error) {
      console.error("Demonstration failed:", error);
    }
    
    console.log("Demonstration completed");
  }
  
  // Run the demonstration
  demonstrateAsyncAwait();