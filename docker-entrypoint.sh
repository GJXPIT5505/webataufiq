#!/bin/sh
set -e

echo "=== Memulai Startup Container Laravel ==="

# Menjalankan migrasi database dengan flag --seed dan --force untuk production
echo "Menjalankan migrasi dan seeding database..."
php artisan migrate --seed --force || {
    echo "Fallback: Menjalankan AdminUserSeeder..."
    php artisan db:seed --class=AdminUserSeeder --force
}

# Optimasi cache untuk environment produksi
echo "Mengoptimasi cache Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "=== Startup selesai, menjalankan proses utama container ==="
exec "$@"

