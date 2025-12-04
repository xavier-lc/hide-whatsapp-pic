// Popup script for managing usernames
const usernameInput = document.getElementById('username-input');
const addBtn = document.getElementById('add-btn');
const usernameList = document.getElementById('username-list');
const emptyMessage = document.getElementById('empty-message');

// Load and display usernames
function loadUsernames() {
  chrome.storage.sync.get(['usernames'], (result) => {
    const usernames = result.usernames || [];
    displayUsernames(usernames);
  });
}

// Display usernames in the list
function displayUsernames(usernames) {
  usernameList.innerHTML = '';
  
  if (usernames.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  }
  
  emptyMessage.style.display = 'none';
  
  usernames.forEach((username, index) => {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = username;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => removeUsername(index);
    
    li.appendChild(span);
    li.appendChild(removeBtn);
    usernameList.appendChild(li);
  });
}

// Add a new username
function addUsername() {
  const username = usernameInput.value.trim();
  
  if (!username) {
    alert('Please enter a username');
    return;
  }
  
  chrome.storage.sync.get(['usernames'], (result) => {
    const usernames = result.usernames || [];
    
    if (usernames.includes(username)) {
      alert('This username is already in the list');
      return;
    }
    
    usernames.push(username);
    
    chrome.storage.sync.set({ usernames }, () => {
      console.log('Username added:', username);
      usernameInput.value = '';
      loadUsernames();
    });
  });
}

// Remove a username
function removeUsername(index) {
  chrome.storage.sync.get(['usernames'], (result) => {
    const usernames = result.usernames || [];
    usernames.splice(index, 1);
    
    chrome.storage.sync.set({ usernames }, () => {
      console.log('Username removed at index:', index);
      loadUsernames();
    });
  });
}

// Event listeners
addBtn.addEventListener('click', addUsername);

usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addUsername();
  }
});

// Load usernames on popup open
loadUsernames();
