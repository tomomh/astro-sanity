# Astro + Sanity
## Modern Content-Driven Architecture

---

# Agenda

1. Vấn đề hiện tại
2. Giới thiệu Sanity
3. Giới thiệu Astro
4. Tại sao kết hợp?
5. So sánh & Use cases

---

# Vấn đề với CMS truyền thống

- Performance kém (WordPress, Drupal)
- Khó customize theo nhu cầu
- Monolithic - Frontend + Backend gắn chặt
- Khó scale, khó maintain
- Lock-in vào một nền tảng

---

# Headless CMS là gì?

```
┌─────────────┐         ┌─────────────┐
│   Backend   │   API   │  Frontend   │
│   (CMS)     │ ──────► │  (Any)      │
└─────────────┘         └─────────────┘
     │
     ▼
  Content chỉ là DATA
  Không quan tâm hiển thị
```

**Lợi ích:** Linh hoạt, multi-platform, performance tốt

---

# Sanity là gì?

- **Headless CMS** - Structured Content Platform
- Real-time collaboration
- **GROQ** - Query language mạnh mẽ
- **Sanity Studio** - Customizable admin UI
- Content Lake - CDN global

---

# Sanity - Điểm mạnh

| Điểm mạnh | Chi tiết |
|-----------|----------|
| Free tier hào phóng | 20GB bandwidth, 10K documents |
| Real-time | Collaboration, live preview |
| Flexible schema | Code-based, version control |
| Portable Text | Rich content format |
| Visual Editing | Live preview trên frontend |
| CDN Global | Performance tốt |

---

# Sanity - Điểm yếu

| Điểm yếu | Mitigation |
|----------|------------|
| Learning curve | GROQ, schema config cần thời gian |
| Pricing scale | Chi phí tăng khi traffic lớn |
| Cần developer | Không plug-and-play như WP |
| Vendor lock-in | GROQ không portable |
| Ít plugins | So với WordPress ecosystem |

---

# So sánh Headless CMS

| Feature | Sanity | Contentful | Strapi | WP Headless |
|---------|--------|------------|--------|-------------|
| **Pricing** | Free 20GB | Free 5 users | Free self-host | Free |
| **Schema** | Code | UI | UI + Code | Predefined |
| **Query** | GROQ | GraphQL | REST/GQL | REST/GQL |
| **Real-time** | ✅ | ❌ | ❌ | ❌ |
| **Self-host** | ❌ | ❌ | ✅ | ✅ |
| **Customize** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

---

# Khi nào chọn Sanity?

**✅ Chọn khi:**
- Schema phức tạp, custom
- Cần real-time collaboration
- Live preview quan trọng
- Team có developers

**❌ Không chọn khi:**
- Cần self-host hoàn toàn
- Non-technical team
- Budget hạn chế (scale lớn)

---

# Astro là gì?

- **Static Site Generator** + SSR hybrid
- **Island Architecture** - Partial hydration
- **Zero JS** by default
- **Multi-framework** - React, Vue, Svelte, Solid
- Content Collections built-in

---

# Astro - Điểm mạnh

| Điểm mạnh | Chi tiết |
|-----------|----------|
| Performance | Zero JS = load cực nhanh |
| Islands | Chỉ hydrate components cần thiết |
| Multi-framework | Dùng React, Vue, Svelte cùng lúc |
| Simple | Dễ học, syntax quen thuộc |
| Content Collections | Type-safe content built-in |
| Build speed | Nhanh hơn Gatsby |

---

# Astro - Điểm yếu

| Điểm yếu | Mitigation |
|----------|------------|
| Ecosystem nhỏ | So với Next.js |
| Ít resources | Tutorials, courses |
| SSR còn mới | Edge cases |
| Không cho complex apps | Dùng Next.js thay thế |
| Enterprise adoption | Còn ít case studies |

---

# So sánh Frameworks

| Feature | Astro | Next.js | Nuxt | Gatsby |
|---------|-------|---------|------|--------|
| **JS shipped** | Minimal | Full | Full | Full |
| **Build speed** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
| **Multi-framework** | ✅ | ❌ | ❌ | ❌ |
| **Learning** | Easy | Medium | Medium | Hard |
| **Best for** | Content | Apps | Vue apps | Data-heavy |

---

# Tại sao Sanity + Astro?

| Sanity | + | Astro |
|--------|---|-------|
| Structured content | | Fast static pages |
| Real-time editing | | Island hydration |
| Live preview | | Multi-framework |
| CDN delivery | | Zero JS default |

**= Content-first, Performance-optimized**

---

# Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Sanity    │────►│    Astro    │────►│   Vercel    │
│   Studio    │     │   Build     │     │   / CDN     │
└─────────────┘     └─────────────┘     └─────────────┘
      │
      ▼
  Content Lake ──── Real-time sync
```

---

# Workflow

1. **Content Editor** → Sanity Studio
2. **Developer** → Astro frontend
3. **Preview** → Live preview integration
4. **Deploy** → Vercel/Netlify auto-build
5. **Update** → Webhook trigger rebuild

---

# Use Cases phù hợp

✅ Marketing websites
✅ Documentation sites
✅ Blogs & magazines
✅ Landing pages
✅ Multi-language sites
✅ E-commerce (content-heavy)

---

# Demo

- Sanity Studio interface
- GROQ queries
- Astro integration
- Live preview

---

# Q&A

**Resources:**
- sanity.io
- astro.build
- docs.astro.build/guides/cms/sanity

