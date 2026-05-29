#!/usr/bin/env bash
set -euo pipefail

# Скрипт объединяет bootloader/partitions/boot_app0/app в один bin для ESP Web Tools.
# Запускать из корня проекта сайта или передать переменные окружения ниже.

CHIP="${CHIP:-esp32}"
FLASH_MODE="${FLASH_MODE:-dio}"
FLASH_FREQ="${FLASH_FREQ:-40m}"
FLASH_SIZE="${FLASH_SIZE:-4MB}"
BOOTLOADER="${BOOTLOADER:-build/bootloader/bootloader.bin}"
PARTITIONS="${PARTITIONS:-build/partition_table/partition-table.bin}"
BOOT_APP0="${BOOT_APP0:-build/boot_app0.bin}"
APP="${APP:-build/robomow.bin}"
OUT="${OUT:-firmware/robomow-esp32-merged.bin}"

python3 -m esptool --chip "$CHIP" merge_bin \
  -o "$OUT" \
  --flash_mode "$FLASH_MODE" \
  --flash_freq "$FLASH_FREQ" \
  --flash_size "$FLASH_SIZE" \
  0x1000 "$BOOTLOADER" \
  0x8000 "$PARTITIONS" \
  0xe000 "$BOOT_APP0" \
  0x10000 "$APP"

ls -lh "$OUT"
