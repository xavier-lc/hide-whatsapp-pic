// Content script that runs on WhatsApp Web
let usernames = [];

// Load usernames from storage
chrome.storage.sync.get(['usernames'], (result) => {
  usernames = result.usernames || [];
  console.log('Loaded usernames:', usernames);
  hideProfilePictures();
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.usernames) {
    usernames = changes.usernames.newValue || [];
    console.log('Updated usernames:', usernames);
    hideProfilePictures();
  }
});

// Function to hide profile pictures
function hideProfilePictures() {
  usernames.forEach(username => {
    if (username && username.trim()) {
      const selector = `[aria-label="Open chat details for ${username}"] img`;
      const images = document.querySelectorAll(selector);
      
      images.forEach(img => {
        img.style.display = 'none';
        console.log(`Hidden profile picture for: ${username}`);
      });
    }
  });
}

// Create a MutationObserver to watch for DOM changes
const observer = new MutationObserver((mutations) => {
  hideProfilePictures();
});

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial run
hideProfilePictures();
