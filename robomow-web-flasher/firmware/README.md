# Firmware directory

Положите сюда реальные бинарники прошивки:

- `robomow-esp32-merged.bin` для ESP32;
- `robomow-esp32s3-merged.bin` для ESP32-S3.

В manifest уже установлен режим без UART-log UI:

- `new_install_improv_wait_time: 0` — не ждать Improv после прошивки;
- `improv: false` — не объявлять Improv-профиль для build.

Это отключает сервисный просмотр устройства из этого сайта. Физический UART на плате этим не блокируется.
