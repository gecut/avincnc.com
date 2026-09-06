# AVIN CNC

وب‌سایت صنعتی آوین ماشین پاژ، ساخته‌شده با Next.js، TypeScript و Tailwind CSS.

## ساختار پروژه

- صفحات و فایل‌های قابل رندر Next.js: `src/app/`
- سکشن‌ها و اجزای قابل استفاده مجدد: `src/components/`
- محتوای تایپ‌شده و اطلاعات محصولات: `src/config/site-config.ts`
- ابزارها و استایل‌های مشترک: `src/lib/` و `src/styles/`
- تصاویر و دارایی‌های عمومی: `public/images/`

فهرست محصولات در `/products`، فیلتر دسته‌بندی‌ها با پارامتر `?category=[categorySlug]` و مسیر محصول به‌شکل
`/products/[productSlug]` ساخته می‌شود.

## اجرا

```bash
pnpm dev
```

سپس آدرس [http://localhost:3000](http://localhost:3000) را باز کنید.

## بررسی نهایی

```bash
pnpm lint
pnpm typecheck
pnpm build
```

صفحات محصول به‌صورت Static Generation ساخته می‌شوند و صفحه اصلی هیچ Client Component یا وابستگی فونت خارجی ندارد.

## اجرای نسخه production با Docker

این پروژه خروجی استاتیک Next.js را با `ghcr.io/gecut/nginx/cdn:2.0.0` از مسیر
`/data` سرو می‌کند. برای ساخت، اجرا و بررسی سلامت origin:

```bash
pnpm deploy:build
pnpm deploy:start
pnpm deploy:verify
```

سرویس به‌صورت پیش‌فرض روی `http://localhost:8080` در دسترس است و endpoint
سلامت آن `http://localhost:8080/server-info` است. برای توقف سرویس:

```bash
pnpm deploy:stop
```
# avincnc.com
# avincnc.com
# avincnc.com
# avincnc.com
