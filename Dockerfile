# Stage 1: Build the application
FROM node:24 AS builder

# ตั้งค่าตำแหน่งโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์ package.json และ pnpm-lock.yaml เพื่อ optimize cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# ตั้งค่า environment สำหรับการ build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# สร้าง production build ของแอป
RUN pnpm build

# Stage 2: Create the final image
FROM node:24-slim AS runner

# ตั้งค่าตำแหน่งโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกเฉพาะไฟล์ที่จำเป็นจาก Stage แรก
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# ติดตั้ง pnpm ใน production stage
RUN npm install -g pnpm
RUN pnpm install --prod=true

# ตั้งค่า environment สำหรับ production
ENV NODE_ENV=production

# รันแอปพลิเคชัน
CMD ["pnpm", "start"]