/**
 * Lightbox — Vanilla JS, progressive enhancement.
 * Click a figure with .zoom to open full-size in a native <dialog>.
 * Without JS: clicking the link opens the image directly.
 * No framework dependencies.
 */

(function () {
  const dialog = document.getElementById('lightbox');
  if (!dialog) return;

  const view = dialog.querySelector('img');
  const closeBtn = dialog.querySelector('.lightbox-close');

  // Open on click of .zoom link
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('a.zoom');
    if (!trigger) return;

    // Prevent default navigation — with JS we open the dialog
    event.preventDefault();

    const thumb = trigger.querySelector('img');
    view.src = trigger.href;
    view.alt = thumb?.alt || '';

    if (!dialog.open) {
      dialog.showModal();
      // Focus trap: focus the close button
      closeBtn?.focus();
    }
  });

  // Close on backdrop click (click on dialog itself, not image or close button)
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  // Close button
  closeBtn?.addEventListener('click', () => {
    dialog.close();
  });

  // Escape key handled natively by <dialog>
})();