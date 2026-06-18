/* ── Bitrix24 Auth & User Profile ── */
(function() {
  'use strict';

  // Bitrix24 JS SDK инициализация
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof BX24 === 'undefined') {
      // Fallback — не в Битрикс24
      setUserProfile({ NAME: 'Локальный', LAST_NAME: 'Пользователь', PERSONAL_PHOTO: '' });
      window.bitrixUser = { NAME: 'Локальный', LAST_NAME: 'Пользователь' };
      return;
    }

    BX24.init(() => {
      // Растягиваем фрейм при загрузке
      BX24.fitWindow();
      
      // Переопределяем навигацию для подстройки высоты
      if (window.navigateTo) {
        const origNavigateTo = window.navigateTo;
        window.navigateTo = function(pageId) {
          origNavigateTo(pageId);
          setTimeout(() => BX24.fitWindow(), 300);
        };
      }

      BX24.callMethod('user.current', {}, (result) => {
        if (result.error()) {
          console.error('Bitrix24 user.current error:', result.error());
          setUserProfile({ NAME: 'Ошибка', LAST_NAME: 'авторизации', PERSONAL_PHOTO: '' });
          window.bitrixUser = { NAME: 'Ошибка', LAST_NAME: 'авторизации' };
        } else {
          const user = result.data();
          setUserProfile(user);
          // Сохраняем для комментариев/загрузок
          window.bitrixUser = user;
        }
      });
    });
  });

  function setUserProfile(user) {
    const nameEl = document.getElementById('userName');
    const avatarEl = document.getElementById('userAvatar');
    if (!nameEl || !avatarEl) return;

    const fullName = [user.NAME, user.LAST_NAME].filter(Boolean).join(' ') || 'Пользователь';
    nameEl.textContent = fullName;

    if (user.PERSONAL_PHOTO) {
      avatarEl.innerHTML = `<img src="${user.PERSONAL_PHOTO}" alt="${fullName}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    }
  }
})();
