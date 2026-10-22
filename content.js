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

// Bubble with the "..." dots shown next to the avatar while someone is typing
const typingBubbleSelector = '#main div.x1ew7x2d.x78zum5.xdt5ytf.x156j7k.x1cy8zhl.x1bczwif';

// The open chat's header shows "<name> is typing…" (or "<name> and ... are typing…")
function isTyping(username) {
  const header = document.querySelector('#main header');
  if (!header) {
    return false;
  }

  return Array.from(header.querySelectorAll('span')).some(span =>
    span.textContent.includes(username) && span.textContent.includes('typing')
  );
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

      var reactionRowSelector = `[aria-label*="${username} reacted with"]`;
      var reactionRows = document.querySelectorAll(reactionRowSelector);

      reactionRows.forEach(element => {
        const profilePic = element.querySelector('img');
        if (profilePic) {
          profilePic.style.display = 'none';
        }
        console.log(`Hidden reaction profile picture for: ${username}`);
      });

      if (isTyping(username)) {
        const typingBubbles = document.querySelectorAll(typingBubbleSelector);

        typingBubbles.forEach(bubble => {
          const profilePic = bubble.parentElement.querySelector('img');
          if (profilePic) {
            profilePic.style.display = 'none';
          }
          console.log(`Hidden typing profile picture for: ${username}`);
        });
      }
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
