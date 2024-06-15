Promise.batchAll = async function (promises, batchSize) {
  const results = []

  // Helper function to execute a batch of promises
  async function executeBatch(batch) {
    const batchResults = await Promise.all(batch)
    results.push(...batchResults)
  }

  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize)
    await executeBatch(batch)
  }

  return results
}