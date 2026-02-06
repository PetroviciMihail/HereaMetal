const listeners = new Set();

const authEvents = {
  onLogout(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  emitLogout() {
    listeners.forEach((cb) => cb());
  },
};

export default authEvents;
