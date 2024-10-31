async function recursiveAsyncCounter(counter) {
    // Base case: stop recursion when counter reaches 0
    if (counter <= 0) {
      console.log("Countdown finished!");
      return;
    }
  
    // Log the current count
    console.log(`Countdown: ${counter}`);
  
    // Simulate some asynchronous operation
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Recursively call itself with a decreased counter
    await recursiveAsyncCounter(counter - 1);
  }
  
  // Self-containing wrapper function
  const selfContainingAsyncFunction = async function() {
    console.log("Starting self-containing async function");
  
    // The function contains its own definition and execution
    const innerFunction = async function(count) {
      await recursiveAsyncCounter(count);
      console.log("Inner function completed");
    };
  
    // Execute the inner function
    await innerFunction(5);
  
    console.log("Self-containing async function completed");
  };
  
  // Execute the self-containing async function
  selfContainingAsyncFunction().then(() => {
    console.log("All operations completed");
  });