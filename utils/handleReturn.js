function handleReturn({ data, returnCode, cookie, error }) {
  const base = {
    data,
    info: error ? "failed" : "success",
    returnCode,
    error,
    cookie,
  };
  return cookie ? { cookie, ...base } : base;
}

module.exports = handleReturn;
