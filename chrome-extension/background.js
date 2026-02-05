let activeTabId = null;
let startTime = null;

// Helper function to send data to your Backend
async function syncLogs(hostname, durationSeconds) {
  try {
    await fetch("http://localhost:3000/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "123", // Matches your dashboard query
        logs: [{ url: `https://${hostname}`, timeSpent: durationSeconds }]
      }),
    });
    console.log(`Synced: ${hostname} for ${durationSeconds}s`);
  } catch (err) {
    console.error("Failed to sync with backend:", err);
  }
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const now = Date.now();

  if (activeTabId && startTime) {
    const duration = now - startTime;
    const durationSeconds = duration / 1000;

    try {
      const tab = await chrome.tabs.get(activeTabId);
      if (tab.url && tab.url.startsWith("http")) {
        const hostname = new URL(tab.url).hostname;

        // 1. Save locally (as you were doing)
        chrome.storage.local.get(["timeLogs"], (result) => {
          const logs = result.timeLogs || {};
          logs[hostname] = (logs[hostname] || 0) + durationSeconds;
          chrome.storage.local.set({ timeLogs: logs });
        });

        // 2. Sync to Backend (New step)
        syncLogs(hostname, durationSeconds);
      }
    } catch (e) {
      console.error("Tab no longer exists or access denied.");
    }
  }

  activeTabId = activeInfo.tabId;
  startTime = now;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTimeLogs") {
    chrome.storage.local.get(["timeLogs"], (result) => {
      sendResponse(result.timeLogs || {});
    });
    return true;
  }
});