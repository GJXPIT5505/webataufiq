FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip nodejs npm sqlite3 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

WORKDIR /app
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY . .

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-dev --optimize-autoloader --no-interaction
RUN npm install --legacy-peer-deps && npm run build

EXPOSE 8080

CMD ["sh", "-c", "touch /mnt/database/database.sqlite && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8080"]
