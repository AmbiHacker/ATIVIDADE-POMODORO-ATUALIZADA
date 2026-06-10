let timeoutId = null;

self.onmessage = function (event) {
  const { activeTask, secondsRemaining } = event.data;

  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (!activeTask) {
    return;
  }

  let remaining = secondsRemaining;

  function tick() {
    self.postMessage(remaining);

    if (remaining <= 0) {
      self.postMessage(0);
      return;
    }

    remaining--;

    timeoutId = setTimeout(tick, 1000);
  }

  tick();
};