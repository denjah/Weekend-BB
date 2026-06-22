/* ── Comment System Logic ── */

window.currentCommentSectionId = null;

window.injectCommentPanel = function() {
  if (!document.getElementById('commentPanel')) {
    const panel = document.createElement('div');
    panel.id = 'commentPanel';
    panel.className = 'comment-panel';
    panel.innerHTML = `
      <div class="comment-panel-header">
        <div class="comment-panel-title">Комментарии</div>
        <button class="comment-panel-close" onclick="closeComments()">✕</button>
      </div>
      <div class="comment-list" id="commentList"></div>
      <div class="comment-input-area">
        <textarea id="commentInput" class="comment-input" placeholder="Оставить комментарий..."></textarea>
        <button class="comment-submit" onclick="submitComment()">Отправить</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  injectCardWidgets();
};

window.injectCardWidgets = function() {
  // Add comment buttons and stats widget to subsections and logobook cards
  document.querySelectorAll('.subsection, .lb-page-card').forEach(sub => {
    // 1. Comment Button
    if (!sub.querySelector('.btn-comment')) {
      const actions = document.createElement('div');
      actions.className = 'subsection-actions';
      const sectionId = sub.id || (sub.closest('.page-section') ? sub.closest('.page-section').id : 'unknown');
      actions.innerHTML = `
        <button class="btn-comment" style="margin-top: var(--space-4);" onclick="openComments('${sectionId}')">
          <span>💬 Комментировать</span>
        </button>
      `;
      sub.appendChild(actions);
    }

    // 2. Stats Widget
    if (!sub.querySelector('.card-stats-widget')) {
      const stats = document.createElement('div');
      stats.className = 'card-stats-widget';
      stats.id = 'stats-' + (sub.id || Math.random().toString(36).substr(2, 9));
      stats.innerHTML = `
        <div class="stat-item status-empty">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
          <span class="stat-tooltip">Материалы не загружены</span>
        </div>
        <div class="stat-item status-empty">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span class="stat-tooltip">Нет комментариев</span>
        </div>
        <div class="stat-item status-empty">
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span class="stat-tooltip">Готовность: 0%</span>
        </div>
        <div class="stat-date" style="display: none;">--.--.----<span class="stat-tooltip">Дата последней загрузки</span></div>
      `;
      
      sub.style.position = 'relative';
      sub.appendChild(stats);
    }
  });
};

window.openComments = async function(sectionId) {
  window.currentCommentSectionId = sectionId;
  const panel = document.getElementById('commentPanel');
  panel.classList.add('open');

  const list = document.getElementById('commentList');
  list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--color-text-muted);">Загрузка...</div>';

  try {
    const res = await fetch(`api/comments.php?section_id=${sectionId}`);
    const comments = await res.json();
    list.innerHTML = '';
    if (comments.length === 0) {
      list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--color-text-muted);">Нет комментариев</div>';
    } else {
      comments.forEach(c => renderComment(c));
    }
  } catch (e) {
    list.innerHTML = `
      <div class="comment-item">
        <div class="comment-header">
          <div class="comment-author">Система (Mock)</div>
        </div>
        <div class="comment-body">PHP API недоступно. Комментарии сохраняются только локально.</div>
      </div>
    `;
  }
};

window.submitComment = async function() {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text || !window.currentCommentSectionId) return;

  input.value = 'Отправка...';
  input.disabled = true;

  try {
    const res = await fetch('api/comments.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_id: window.currentCommentSectionId, text: text })
    });
    const json = await res.json();

    if (document.getElementById('commentList').innerHTML.includes('Нет комментариев')) {
      document.getElementById('commentList').innerHTML = '';
    }

    if (json.status === 'success') {
      renderComment(json.data, true);
      if (window.updateDashboardStats) window.updateDashboardStats();
    } else {
      alert('Ошибка сохранения комментария');
    }
  } catch (e) {
    if (document.getElementById('commentList').innerHTML.includes('Нет комментариев') || document.getElementById('commentList').innerHTML.includes('PHP API недоступно')) {
      document.getElementById('commentList').innerHTML = '';
    }
    renderComment({
      user: 'Вы (Mock)',
      timestamp: Date.now() / 1000,
      text: text
    }, true);
  }

  input.value = '';
  input.disabled = false;
};

window.renderComment = function(c, prepend = false) {
  const list = document.getElementById('commentList');
  const item = document.createElement('div');
  item.className = 'comment-item';
  const date = c.timestamp ? new Date(c.timestamp * 1000).toLocaleString('ru-RU') : 'Только что';
  item.innerHTML = `
    <div class="comment-header">
      <div class="comment-author">${c.user}</div>
      <div class="comment-time">${date}</div>
    </div>
    <div class="comment-body">${c.text}</div>
  `;
  if (prepend) {
    list.prepend(item);
  } else {
    list.appendChild(item);
  }
};

window.closeComments = function() {
  document.getElementById('commentPanel').classList.remove('open');
};
