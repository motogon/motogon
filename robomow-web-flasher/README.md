# Robomow ESP Web Flasher

Статический сайт для установки прошивки Robomow ESP32 / ESP32-S3 через браузер на базе ESP Web Tools и GitHub Pages.

## Что внутри

- `index.html` — страница установщика, RU/EN, тёмный дизайн.
- `assets/app.js` — переключение языка и manifest-профиля.
- `firmware/manifest.json` — общий manifest с ESP32 и ESP32-S3.
- `firmware/manifest-esp32.json` — отдельный manifest ESP32.
- `firmware/manifest-esp32s3.json` — отдельный manifest ESP32-S3.
- `.github/workflows/pages.yml` — публикация GitHub Pages через Actions.
- `scripts/merge_esp32_bin.sh` — пример создания merged binary через esptool.
- `scripts/update_manifest_version.py` — обновление версии manifest.

## UART-логи

На сайте намеренно нет режима просмотра UART-логов и нет ссылок на консоль. Manifest настроен так, чтобы установщик не ждал Improv после прошивки:

```json
"new_install_improv_wait_time": 0,
"improv": false
```

Это ограничивает интерфейс сайта: он предназначен только для прошивки. Это не является аппаратной защитой UART — человек с физическим доступом к плате всё равно сможет открыть UART внешним терминалом.

## Подготовка бинарника

ESP Web Tools удобнее всего использовать с merged binary, который записывается с offset `0`.

Пример для ESP32:

```bash
CHIP=esp32 \
BOOTLOADER=build/bootloader/bootloader.bin \
PARTITIONS=build/partition_table/partition-table.bin \
BOOT_APP0=build/boot_app0.bin \
APP=build/robomow.bin \
OUT=firmware/robomow-esp32-merged.bin \
scripts/merge_esp32_bin.sh
```

Для ESP32-S3 поменяйте `CHIP=esp32s3` и `OUT=firmware/robomow-esp32s3-merged.bin`.

## Публикация на GitHub Pages

```bash
git init
git add .
git commit -m "Initial Robomow web flasher"
git branch -M main
git remote add origin git@github.com:OWNER/REPO.git
git push -u origin main
```

В настройках репозитория откройте **Settings → Pages** и выберите **Build and deployment → Source: GitHub Actions**. После выполнения workflow сайт будет доступен по адресу вида:

```text
https://OWNER.github.io/REPO/
```

## Проверка локально

```bash
python3 -m http.server 8080
```

Локально Web Serial разрешён на `localhost`, но для нормального использования лучше открыть опубликованный HTTPS-адрес GitHub Pages.
