# Antares

Astro-based Blog Template

**[Github](https://github.com/coderxi1/astro-antares) | [Demo Page](https://antares.coderxi.com)**

## 💻 Installation

- Git  
  ```
  git clone https://github.com/coderxi1/astro-antares blog
  ```
- Astro
  ```
  pnpm create astro@latest -- --template coderxi1/astro-antares
  ```

### 💻 Start

- Move to the blog directory, then install dependencies and start development
```
cd [/path/to/]
pnpm install
pnpm run dev
```

## 🎉 Features

- ✅ **Simple style**: Minimalist! Minimalist! And still minimalist!
- ✅ **Dark Mode**: Night mode `<html class="dark">`
- ✅ **Responsive Design**: Responsive design based on unocss, adapting to different devices.
- ✅ **Attached sitemap**: Comes with a sitemap / subscription rss.xml feed.xml baidusitemap.xml sitemap-index.xml
- ✅ **Easy-to-secondary-develop**: Create custom pages **quickly** and **efficiently**, and **freely** adjust sidebar cards.
- ✅ **Easy-to-use**: Most of the configurations that need to be changed are integrated in src/config.ts
- ✅ **Post-Frontmatter**: Richer frontmatter, including **top function**, **encryption function**, etc.

## 🖥️ Create Page

### .astro
- `src/pages/archives.astro`
  ```astro
  <PageLayout
    title="Archive"
    titleIcon="mdi:archive"
    asideCards={['CardRecentPost','CardCategroies','CardTagCloud']}
  >
    <PostListSimple posts={posts}/>
  </PageLayout>
  ```
### .mdx
- `src/pages/archives.mdx`
  ```mdx
  ---
  layout: '@/layouts/PageLayout.astro'
  asideCards: 
    - CardRecentPost
    - CardCategroies
    - CardTagCloud
  title: 'Archive'
  titleIcon: 'mdi:archive'
  ---

  import posts from '@/content/posts'
  import PostListSimple from '@/components/PostListSimple.astro'

  <PostListSimple posts={posts}/>
  ```

## ⚙ Configuration

### config.ts
- `src/config.ts`
  | **Configuration**        | **Description**                                                                                      |
  |--------------------------|-----------------------------------------------------------------------------------------------------|
  | **SITE_INFO**             | Basic information about the website, such as title, description, etc.                              |
  | **POST_PAGE_SIZE**        | Number of posts or content items displayed per page.                                               |
  | **DEFAULT_FRONTMATTER**   | Default post or page metadata configuration, such as title, date, tags, etc.                        |
  | **SIDEBAR_SETTINGS**      | Configuration for what is displayed in the website sidebar, such as navigation, search box, etc.    |
  | **ASIDE_CARDS**           | Sidebar cards or additional information sections.                                                  |
  | **NAV_ITEMS**             | Links in the navigation bar, such as home page, blog, etc.                                         |
  | **FOOTER**                | Footer content, such as copyright information, site links, etc.                                    |
  | **FRIEND_LINK**           | Friend links, which are links to other related websites.                                           |

### Post-Frontmatter
- `posts/*.md`
  | Field       | Content                                | Optional | Description                        |
  |-------------|----------------------------------------|----------|------------------------------------|
  | title       | `'Antares Documentation'`              | **Required** | Title                           |
  | **titleIcon**   | `'/favicon.svg'`                    | Optional | Title icon                         |
  | **titleColor**  | `'#0998DF'`                          | Optional | Title gradient color               |
  | publishDate | `'2024-12-19'`                         | Optional | Publish date (defaults to file creation date) |
  | updatedDate | `'2024-12-19'`                         | Optional | Updated date (defaults to file modification date) |
  | tags        | `['Astro', 'TagD']`                    | Optional | Tags                               |
  | categories  | `['Astro', 'Demo']`                    | Optional | Categories                         |
  | description | `'No description available.'`          | Optional | Post description                    |
  | **top**     | `1`                                     | Optional | Pin post (the larger the number, the closer to the top) |
  | **password**| `123456`                                | Optional | Set a password for the post         |
  | **bodyJoin**| `./README.md`                           | Optional | Provide a file path to join another markdown document |