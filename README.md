# WingfyLyu Portfolio

A creative personal portfolio website built with Hugo.

## Features

- 🎨 Creative/Artistic design style
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive layout
- ✨ Particle animation effects
- ⌨️ Typing animation
- 🚀 Auto-deploy to GitHub Pages

## Local Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.121.0 or later)

### Run locally

```bash
hugo server -D
```

Visit `http://localhost:1313`

## Deployment

This site automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup GitHub Pages

1. Go to repository Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push changes to `main` branch

## Customization

### Update Personal Info

Edit `hugo.toml`:

```toml
[params]
  author = 'Your Name'
  email = 'your@email.com'
  github = 'yourusername'
```

### Add Projects

Create new markdown files in `content/projects/`:

```bash
hugo new projects/my-project.md
```

### Add Your Photo

Replace the placeholder in `layouts/index.html` or add your image to `static/images/`.

## Structure

```
├── archetypes/          # Content templates
├── assets/              # CSS, JS files
├── content/             # Site content
│   └── projects/        # Project pages
├── layouts/             # HTML templates
│   ├── _default/        # Default layouts
│   └── partials/        # Reusable components
├── static/              # Static files
└── hugo.toml           # Site configuration
```

## License

MIT
