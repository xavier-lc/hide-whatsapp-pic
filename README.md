# Hide WhatsApp Profile Pictures Extension

A browser extension for Brave (and other Chromium-based browsers) that hides profile pictures for specific WhatsApp contacts on WhatsApp Web.

## Features

- Configure usernames through a user-friendly popup interface
- Automatically hides profile pictures for configured contacts
- Real-time updates when DOM changes occur
- Persistent storage of usernames across browser sessions

## Installation

### For Brave Browser

1. Open Brave browser
2. Navigate to `brave://extensions/`
3. Enable "Developer mode" (toggle in the top right corner)
4. Click "Load unpacked"
5. Select the extension directory (`/var/www/hide-whatsapp-pic`)

### For Chrome Browser

1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right corner)
4. Click "Load unpacked"
5. Select the extension directory

## Usage

1. Click on the extension icon in your browser toolbar
2. Enter the username of the contact whose profile picture you want to hide
3. Click "Add" to add the username to the list
4. Navigate to https://web.whatsapp.com/
5. Profile pictures for the configured usernames will be automatically hidden

## How It Works

The extension uses:
- **Manifest V3** for modern browser extension architecture
- **Content Script** that runs on WhatsApp Web and monitors the page for profile pictures
- **MutationObserver** to detect DOM changes and apply hiding rules in real-time
- **Chrome Storage API** to persist usernames across sessions
- **Popup UI** for easy username management

## Technical Details

### CSS Selector

The extension targets images using the following selector pattern:
```
[aria-label="Open chat details for ${username}"] img
```

This selector finds elements with the aria-label attribute that matches the pattern and removes the images within them.

## Files Structure

- `manifest.json` - Extension configuration
- `content.js` - Content script that runs on WhatsApp Web
- `popup.html` - Popup interface HTML
- `popup.css` - Popup styling
- `popup.js` - Popup functionality
- `icons/` - Extension icons (need to be created)

## Note on Icons (Optional)

Icons are optional. The extension will work fine without them - Brave will just show a default placeholder icon. If you want custom icons later, you can add them to the `icons/` directory and update `manifest.json`.

## Permissions

The extension requires:
- `storage` - To save and retrieve the list of usernames
- `host_permissions` for `https://web.whatsapp.com/*` - To run the content script on WhatsApp Web

## Privacy

All data is stored locally in your browser using Chrome's storage API. No data is sent to external servers.

## License

MIT License - Feel free to modify and distribute as needed.
