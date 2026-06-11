# RoboDend — Руководство пользователя (pub)

_Версия прошивки: 2.3.0-pre.107-pub · мост Bluetooth ↔ Wi-Fi/MQTT для газонокосилок Robomow._

> 🇬🇧 **English version below** — see [User Manual (English)](#robodend--user-manual-pub).

---

## Что это

RoboDend — компактный модуль на ESP32-S3, который подключается к газонокосилке
Robomow по Bluetooth и даёт ей веб-интерфейс, MQTT и (опционально) GPS/RTK. Вы
управляете косилкой с телефона или из системы умного дома, не открывая
официальное приложение.

Сборка **pub** предназначена для конечных пользователей: она прошивается прямо из
браузера через [ESP Web Tools](https://esphome.github.io/esp-web-tools/) и
работает в «тихом» режиме (без отладочных логов).

## Поддерживаемые серии

| Серия | Статус поддержки |
|-------|------------------|
| **RS** (например RS615/RS625) | Основная. Полностью реализована и проверена на железе. |
| **RC** (например RC302/RC308) | Экспериментальная. Восстановлена по приложению ManMow, **на железе не проверена**. |
| **RX** (например RX12/RX20) | Экспериментальная. Восстановлена по приложению ManMow, **на железе не проверена**. |

В сборке **pub** поддержка всех серий включена по умолчанию — модуль сам
определяет серию косилки при подключении. Для серий RC и RX функции отмечены
ниже как экспериментальные: они работают «как должны» по спецификации, но не
гарантированы. Начинайте с простых команд и держите косилку под наблюдением.

## Первое включение

1. **Прошейте модуль.** Откройте веб-флешер в Chrome или Edge, нажмите
   _Connect_, выберите USB-порт модуля и дождитесь окончания прошивки.
2. **Подключитесь к точке доступа.** После старта модуль поднимает открытую
   Wi-Fi-сеть **`RoboDend-Setup-XXXX`**. Подключитесь к ней с телефона —
   страница настройки откроется автоматически (captive-portal). Если нет —
   откройте в браузере `http://192.168.4.1`.
3. **Заполните форму.**
   - **Серийный номер платы** — обязателен, нужен для авторизации по Bluetooth.
     Подсказку «Как узнать?» можно открыть прямо в форме.
   - **Wi-Fi** — необязателен. Без него модуль работает как «пульт» (только
     точка доступа + Bluetooth), с ним — доступен из домашней сети и MQTT.
   - **Серии косилок** — флажок «Включить поддержку RC / RX» в pub уже отмечен.
     Для косилки RS его можно оставить как есть: на RS поведение не меняется.
4. Нажмите **«Сохранить и перезагрузить»**. Модуль перезапустится и сам выйдет
   на связь с косилкой.

## Доступность функций по сериям

✅ — доступно и проверено · ⚠️ — реализовано по реверсу, **не проверено на железе**
· ❌ — недоступно для этой серии.

| Функция | RS | RX | RC |
|---------|:--:|:--:|:--:|
| Подключение, авторизация, статус связи | ✅ | ⚠️ | ⚠️ |
| Статус косилки: заряд, источник питания, режим, причина остановки | ✅ | ⚠️ | ⚠️ |
| Текущая и следующая зона | ✅ | ⚠️ | ⚠️ |
| Команды: Стоп / Кромка / Кошение / Домой | ✅ | ⚠️ | ⚠️ |
| Кошение выбранной зоны | ✅ | ⚠️ | ⚠️ |
| Ручное управление (джойстик) + ножи | ✅ | ⚠️ | ⚠️ |
| Снятие блококировки от угона (unlock) | ✅ | ⚠️ | ⚠️ |
| Недельное расписание (просмотр/правка) | ✅ | ❌ | ❌ |
| Настройки зон (площадь, интенсивность) | ✅ | ⚠️ | ❌ |
| GPS / RTK (надстройка модуля) | ✅ | ✅ | ✅ |
| OTA-обновление, Wi-Fi, MQTT, веб-интерфейс | ✅ | ✅ | ✅ |

GPS/RTK, обновление прошивки и сетевые функции — это возможности самого модуля,
они не зависят от серии косилки.

## Повседневное использование

- **Главная страница (`/status`)** показывает текущее состояние и кнопки
  управления. Данные обновляются автоматически.
- **Команды по MQTT** публикуются в топик `robomow/action`, например:
  - `mosquitto_pub -t robomow/action -m home` — отправить на базу;
  - `mosquitto_pub -t robomow/action -m mow` — начать кошение;
  - `mosquitto_pub -t robomow/action -m stop` — остановить.
- **Режим «пульт»** (без домашнего Wi-Fi): просто оставайтесь подключёнными к
  сети `RoboDend-Setup-XXXX` и управляйте через `http://192.168.4.1`.

## Обновление прошивки (OTA)

Модуль умеет обновляться «по воздуху». Проверка и установка:

```
mosquitto_pub -t robomow/action -m ota-check    # проверить новую версию
mosquitto_pub -t robomow/action -m ota-apply    # установить
```

Обновления **pub** ставятся только поверх **pub** — это сделано намеренно.

## Важные замечания

- Для серий **RC** и **RX** функции, отмеченные ⚠️, работают по спецификации, но
  не проверялись на реальной технике. Проверяйте их осторожно.
- Серийный номер платы — это **не** серийный номер косилки. Это идентификатор
  главной платы, по которому косилка авторизует Bluetooth-подключение.
- Если что-то пошло не так, вернуться к форме настройки можно в любой момент:
  точка доступа `RoboDend-Setup-XXXX` остаётся активной всегда.

---
---

# RoboDend — User Manual (pub)

_Firmware: 2.3.0-pre.107-pub · a Bluetooth ↔ Wi-Fi/MQTT bridge for Robomow mowers._

> 🇷🇺 **Русская версия выше** — см. [Руководство пользователя](#robodend--руководство-пользователя-pub).

---

## What it is

RoboDend is a small ESP32-S3 module that connects to a Robomow mower over
Bluetooth and gives it a web interface, MQTT, and optional GPS/RTK. You control
the mower from your phone or a smart-home system without opening the official app.

The **pub** build is meant for end users: you flash it straight from the browser
with [ESP Web Tools](https://esphome.github.io/esp-web-tools/), and it runs
silently (no debug logging).

## Supported series

| Series | Support status |
|--------|----------------|
| **RS** (e.g. RS615/RS625) | Primary. Fully implemented and verified on hardware. |
| **RC** (e.g. RC302/RC308) | Experimental. Reverse-engineered from the ManMow app, **not hardware-verified**. |
| **RX** (e.g. RX12/RX20) | Experimental. Reverse-engineered from the ManMow app, **not hardware-verified**. |

In the **pub** build, support for all series is on by default — the module
detects the mower's series automatically on connection. For RC and RX the
features below are marked as experimental: they behave as the specification
implies but are not guaranteed. Start with simple commands and keep the mower
in sight.

## First-time setup

1. **Flash the module.** Open the web flasher in Chrome or Edge, click
   _Connect_, pick the module's USB port, and wait for flashing to finish.
2. **Join the access point.** On boot the module starts an open Wi-Fi network
   called **`RoboDend-Setup-XXXX`**. Connect your phone to it — the setup page
   opens automatically (captive portal). If it doesn't, browse to
   `http://192.168.4.1`.
3. **Fill in the form.**
   - **Mainboard serial** — required; it's used for Bluetooth authentication. A
     "How to find?" hint is available right in the form.
   - **Wi-Fi** — optional. Without it the module works as a handheld remote
     (access point + Bluetooth only); with it the module is reachable on your
     home network and via MQTT.
   - **Mower series** — the "Enable RC / RX support" checkbox is already ticked
     in pub. For an RS mower you can leave it as is: RS behaviour is unaffected.
4. Click **"Save and reboot"**. The module restarts and connects to the mower
   on its own.

## Feature availability by series

✅ — available and verified · ⚠️ — implemented from reverse engineering,
**not hardware-verified** · ❌ — not available for this series.

| Feature | RS | RX | RC |
|---------|:--:|:--:|:--:|
| Connect, authenticate, link status | ✅ | ⚠️ | ⚠️ |
| Mower status: charge, power source, mode, stop reason | ✅ | ⚠️ | ⚠️ |
| Current and next zone | ✅ | ⚠️ | ⚠️ |
| Commands: Stop / Edge / Mow / Home | ✅ | ⚠️ | ⚠️ |
| Mow a specific zone | ✅ | ⚠️ | ⚠️ |
| Manual drive (joystick) + blades | ✅ | ⚠️ | ⚠️ |
| Anti-theft unlock | ✅ | ⚠️ | ⚠️ |
| Weekly schedule (view/edit) | ✅ | ❌ | ❌ |
| Zone settings (area, intensity) | ✅ | ⚠️ | ❌ |
| GPS / RTK (module add-on) | ✅ | ✅ | ✅ |
| OTA updates, Wi-Fi, MQTT, web UI | ✅ | ✅ | ✅ |

GPS/RTK, firmware updates, and networking are capabilities of the module itself
and do not depend on the mower's series.

## Everyday use

- **The home page (`/status`)** shows the current state and control buttons.
  It refreshes automatically.
- **MQTT commands** are published to the `robomow/action` topic, for example:
  - `mosquitto_pub -t robomow/action -m home` — send to base;
  - `mosquitto_pub -t robomow/action -m mow` — start mowing;
  - `mosquitto_pub -t robomow/action -m stop` — stop.
- **Handheld mode** (no home Wi-Fi): simply stay connected to the
  `RoboDend-Setup-XXXX` network and control the mower at `http://192.168.4.1`.

## Updating the firmware (OTA)

The module can update over the air. To check and install:

```
mosquitto_pub -t robomow/action -m ota-check    # check for a new version
mosquitto_pub -t robomow/action -m ota-apply    # install it
```

A **pub** build only updates to another **pub** build — this is by design.

## Important notes

- For the **RC** and **RX** series, the features marked ⚠️ follow the
  specification but have not been tested on real hardware. Try them carefully.
- The mainboard serial is **not** the mower's serial number. It's the
  identifier of the main board that the mower uses to authorise the Bluetooth
  connection.
- If anything goes wrong, you can return to the setup form at any time: the
  `RoboDend-Setup-XXXX` access point is always available.
