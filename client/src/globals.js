function getBackend() {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:8282';
  }
  return `https://${window.location.hostname}`;
}

export default getBackend;
