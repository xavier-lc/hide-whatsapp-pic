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

function getParentButton(element) {
  let parent = element.parentElement;

  if (parent.role === 'button') {
    return parent;
  }

  return getParentButton(parent);
}

// Function to hide profile pictures
function hideProfilePictures() {
  usernames.forEach(username => {
    if (username && username.trim()) {
      const chatImagesSelector = `[aria-label="Open chat details for ${username}"] img`;
      const chatImages = document.querySelectorAll(chatImagesSelector);

      chatImages.forEach(img => {
        img.style.display = 'none';
        console.log(`Hidden chat profile picture for: ${username}`);
      });

      const groupInfoNameSelector = `span[title="${username}"]`;
      const groupInfoNames = document.querySelectorAll(groupInfoNameSelector);

      groupInfoNames.forEach(element => {
        const button = getParentButton(element);
        const profilePic = button.querySelector('img');
        if (profilePic) {
          profilePic.style.display = 'none';
        }
        console.log(`Hidden group info profile picture for: ${username}`);
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
