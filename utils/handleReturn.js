function handleReturn({ data, returnCode, error }) {
  return {
    data,
    info: error ? "failed" : "success",
    returnCode,
    error,
  };
}

module.exports = handleReturn;
