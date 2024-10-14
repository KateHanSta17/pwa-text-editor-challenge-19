const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);  // Show the install button
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();  // Show the install prompt
  window.deferredPrompt = null;  // Reset the deferred prompt after the user interacts
  butInstall.classList.toggle('hidden', true);  // Hide the install button after installation
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  window.deferredPrompt = null;  // Clear the deferredPrompt when the app is installed
});
