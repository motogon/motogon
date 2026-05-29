const translations = {
  ru: {
    eyebrow: 'ESP Web Tools · GitHub Pages',
    title: 'Загрузка прошивки Robomow ESP через браузер',
    lead: 'Подключите ESP к USB, откройте страницу в Chrome или Edge и нажмите кнопку установки. Прошивка будет записана через Web Serial без ручного запуска esptool.',
    installTitle: 'Установка прошивки',
    installSubtitle: 'Выберите профиль и запустите установку. UART‑логи в этом интерфейсе не выводятся.',
    profileLabel: 'Профиль прошивки',
    profileDefault: 'Robomow ESP, автоопределение чипа',
    installButton: 'Подключить и прошить',
    unsupported: 'Браузер не поддерживает Web Serial. Используйте Chrome, Edge или другой Chromium-браузер на ПК.',
    notAllowed: 'Web Serial работает только на HTTPS или localhost. Откройте страницу через GitHub Pages.',
    installHint: 'Перед прошивкой отключите питание моторов/ножа. Для первой установки обычно выбирайте стирание flash.',
    stepsTitle: 'Порядок действий',
    step1: 'Подключите ESP32/ESP32-S3 к компьютеру качественным USB‑кабелем с передачей данных.',
    step2: 'Откройте эту страницу в Chrome или Edge. На iOS Web Serial не работает.',
    step3: 'Нажмите «Подключить и прошить», выберите USB‑порт и подтвердите запись.',
    step4: 'После завершения дождитесь перезагрузки ESP и проверьте точку доступа или веб‑интерфейс прошивки.',
    safetyTitle: 'Безопасность',
    safetyText: 'Для Robomow это сервисная прошивка. Перед установкой физически исключите запуск ножа и движения: снимите питание силовой части, не держите косилку на земле в активном состоянии, используйте аварийную остановку.',
    firmwareTitle: 'Файлы прошивки',
    firmwareText: 'Положите merged binary в каталог firmware и обновите manifest. Для ESP32 с ESP-IDF/Arduino обычно нужен один объединённый bin с offset 0.',
    githubTitle: 'Публикация',
    githubText: 'Сайт готов для GitHub Pages. После push включите Pages из GitHub Actions или используйте приложенный workflow.',
    uartTitle: 'UART‑логи отключены в интерфейсе сайта',
    uartText: 'На странице нет режима просмотра UART. Manifest настроен без Improv‑ожидания, чтобы установщик не переходил в сервисный режим просмотра устройства после прошивки. Это не блокирует физический UART для человека с доступом к плате и внешним терминалом.',
    footer: 'Installer powered by ESP Web Tools. Firmware project: Robomow ESP.'
  },
  en: {
    eyebrow: 'ESP Web Tools · GitHub Pages',
    title: 'Browser-based Robomow ESP firmware installer',
    lead: 'Connect the ESP board over USB, open this page in Chrome or Edge, then start installation. Firmware is written through Web Serial without running esptool manually.',
    installTitle: 'Firmware installation',
    installSubtitle: 'Choose a profile and start flashing. UART logs are not exposed in this interface.',
    profileLabel: 'Firmware profile',
    profileDefault: 'Robomow ESP, chip autodetect',
    installButton: 'Connect and flash',
    unsupported: 'This browser does not support Web Serial. Use Chrome, Edge, or another Chromium browser on a desktop computer.',
    notAllowed: 'Web Serial works only on HTTPS or localhost. Open this page through GitHub Pages.',
    installHint: 'Disconnect motor/blade power before flashing. For a first install, flash erase is usually the right choice.',
    stepsTitle: 'Steps',
    step1: 'Connect the ESP32/ESP32-S3 board with a reliable USB data cable.',
    step2: 'Open this page in Chrome or Edge. Web Serial is not available on iOS.',
    step3: 'Press “Connect and flash”, choose the USB port, and confirm flashing.',
    step4: 'After completion, wait for reboot and check the firmware access point or web UI.',
    safetyTitle: 'Safety',
    safetyText: 'For Robomow this is service firmware. Before installation, physically prevent blade and motion startup: disconnect power from the power stage, do not keep the mower active on the ground, and use emergency stop.',
    firmwareTitle: 'Firmware files',
    firmwareText: 'Place merged binaries into the firmware directory and update the manifest. ESP32 ESP-IDF/Arduino builds normally need a single merged bin at offset 0.',
    githubTitle: 'Publishing',
    githubText: 'The site is ready for GitHub Pages. After push, enable Pages from GitHub Actions or use the included workflow.',
    uartTitle: 'UART logs are disabled in the website UI',
    uartText: 'The page does not include a UART log viewer. The manifest disables Improv waiting so the installer does not switch into a device service view after flashing. This does not block physical UART access with an external terminal.',
    footer: 'Installer powered by ESP Web Tools. Firmware project: Robomow ESP.'
  }
};

const installButton = document.getElementById('installButton');
const manifestSelect = document.getElementById('manifestSelect');

manifestSelect.addEventListener('change', () => {
  installButton.setAttribute('manifest', manifestSelect.value);
});

function setLanguage(lang) {
  const dict = translations[lang] || translations.ru;
  document.documentElement.lang = lang;
  for (const node of document.querySelectorAll('[data-i18n]')) {
    const key = node.getAttribute('data-i18n');
    if (dict[key]) node.textContent = dict[key];
  }
  for (const button of document.querySelectorAll('[data-lang-button]')) {
    button.classList.toggle('active', button.getAttribute('data-lang-button') === lang);
  }
  localStorage.setItem('robomowInstallerLang', lang);
}

for (const button of document.querySelectorAll('[data-lang-button]')) {
  button.addEventListener('click', () => setLanguage(button.getAttribute('data-lang-button')));
}

setLanguage(localStorage.getItem('robomowInstallerLang') || 'ru');
