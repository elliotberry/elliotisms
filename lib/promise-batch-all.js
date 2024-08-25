/**
 * Executes an array of promises in batches, allowing for concurrent processing
 * of multiple batches to improve performance.
 *
 * @param {Promise[]} promises - An array of promises to be executed.
 * @param {number} batchSize - The number of promises to execute in each batch.
 * @returns {Promise<any[]>} A promise that resolves to an array containing the results of all input promises.
 *
 * @example
 * const promises = [
 *   fetch('https://api.example.com/data1'),
 *   fetch('https://api.example.com/data2'),
 *   fetch('https://api.example.com/data3'),
 *   // ...more promises
 * ];
 *
 * const batchSize = 2;
 * Promise.batchAll(promises, batchSize).then(results => {
 *   console.log('All promises resolved:', results);
 * }).catch(error => {
 *   console.error('Some promises failed:', error);
 * });
 */
Promise.batchAll = async function (promises, batchSize) {
  const results = [];
  const executingBatches = [];

  // Helper function to execute a batch of promises
  async function executeBatch(batch) {
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }

  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchPromise = executeBatch(batch);
    executingBatches.push(batchPromise);
  }

  // Wait for all batches to complete
  await Promise.all(executingBatches);

  return results;
};