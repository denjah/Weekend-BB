/* ── UI Rendering: Upload Zones ── */
window.renderUploadZones = function() {
  document.querySelectorAll('.placeholder-block, .lb-visual-placeholder').forEach(block => {
    if (block.querySelector('.upload-btn')) return; // Already rendered

    // Convert to upload zone
    block.classList.add('upload-zone');
    block.setAttribute('ondragover', 'event.preventDefault(); this.classList.add("drag-over");');
    block.setAttribute('ondragleave', 'this.classList.remove("drag-over");');
    block.setAttribute('ondrop', 'handleDrop(event, this);');

    const icon = block.querySelector('.placeholder-icon');
    if (icon) {
      icon.classList.remove('placeholder-icon');
      icon.classList.add('upload-zone-icon');
    }

    const title = block.querySelector('.placeholder-label');
    if (title) {
      title.classList.remove('placeholder-label');
      title.classList.add('upload-zone-text');
    }

    const hint = block.querySelector('.placeholder-hint');
    if (hint) {
      hint.classList.remove('placeholder-hint');
      hint.classList.add('upload-zone-hint');
    }

    const badge = block.querySelector('.badge');
    if (badge) badge.remove();

    const actions = document.createElement('div');
    actions.className = 'placeholder-actions';
    actions.innerHTML = `
      <button class="upload-btn" onclick="document.getElementById('fileInput').click()">
        <span>+</span> Загрузить материал
      </button>
    `;
    block.appendChild(actions);

    // Add empty files container
    const filesDiv = document.createElement('div');
    filesDiv.className = 'uploaded-files';
    block.appendChild(filesDiv);
  });
};

window.handleDrop = async function(e, el) {
  e.preventDefault();
  el.classList.remove('drag-over');
  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
  if (!files || files.length === 0) return;

  const sectionId = el.closest('.subsection')?.id || el.closest('.page-section')?.id || el.closest('.lb-page-card')?.id || 'unknown';

  for (let file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('section_id', sectionId);

    try {
      const res = await fetch('api/upload.php', { method: 'POST', body: formData });
      const json = await res.json();
      if (json.status === 'success') {
        renderUploadedFile(el, file.name, 'Загружено на сервер');
        if (window.updateDashboardStats) window.updateDashboardStats();
      } else {
        renderUploadedFile(el, file.name, 'Ошибка: ' + (json.message || 'Server error'));
      }
    } catch (err) {
      renderUploadedFile(el, file.name, 'Mock (PHP недоступен)');
    }
  }
  
  // Update stats widget state
  const subsection = el.closest('.subsection') || el.closest('.lb-page-card');
  if (subsection) {
    const statsWidget = subsection.querySelector('.card-stats-widget');
    if (statsWidget) {
      statsWidget.classList.add('widget-done');
      const uploadStat = statsWidget.querySelector('.stat-item:nth-child(1)');
      if (uploadStat) {
        uploadStat.classList.remove('status-empty');
        uploadStat.classList.add('status-done');
        const tt = uploadStat.querySelector('.stat-tooltip');
        if (tt) tt.textContent = 'Материал загружен';
      }
      const dateStat = statsWidget.querySelector('.stat-date');
      if (dateStat) {
        dateStat.style.display = 'flex';
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        dateStat.childNodes[0].nodeValue = `${dd}.${mm}.${yyyy}`;
      }
    }
  }
};

window.renderUploadedFile = function(el, name, metaText) {
  const filesContainer = el.querySelector('.uploaded-files');
  if (!filesContainer) return;
  const fileEl = document.createElement('div');
  fileEl.className = 'uploaded-file fade-in-up visible';
  fileEl.innerHTML = `
    <div class="uploaded-file-thumb">📄</div>
    <div class="uploaded-file-info">
      <div class="uploaded-file-name">${name}</div>
      <div class="uploaded-file-meta">${metaText}</div>
    </div>
    <span class="badge badge-new uploaded-file-badge">Новое</span>
  `;
  filesContainer.appendChild(fileEl);

  if (window.gsap) {
    gsap.fromTo(fileEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  }
};

// Global file input handler proxy
window.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      // Find the currently hovered or active upload zone
      // Since it's a global input, we might need a way to track which button triggered it.
      // For now, if someone clicks the button, the event target is the input.
      // We should ideally pass the element to the input somehow, or change the button to create its own input.
      // A quick fix: the button click should set a global variable for the current upload zone.
    });
  }
});
