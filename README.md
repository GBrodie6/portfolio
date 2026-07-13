# Griffin Brodie — Portfolio

Single-file static site. No build step, no dependencies.

## Before you deploy

Open `index.html` and swap out:
- `youremail@example.com` in the Contact section — real email
- `github.com/GBrodie6` — confirm this is right, or swap for a different profile link
- Add a LinkedIn link next to GitHub if you want one

## Deploy to Vercel (free .vercel.app URL)

**Option A — GitHub + Vercel dashboard (recommended, auto-redeploys on push)**
1. Create a new GitHub repo, push this folder to it:
   ```
   git init
   git add .
   git commit -m "portfolio site"
   git branch -M main
   git remote add origin https://github.com/GBrodie6/portfolio.git
   git push -u origin main
   ```
2. Go to vercel.com/new, import that repo.
3. Framework preset: **Other** (it's static, no build command needed).
4. Deploy. You'll get a `your-project.vercel.app` URL immediately, and every future push to `main` redeploys automatically.

**Option B — Vercel CLI (fastest, no GitHub needed)**
1. `npm install -g vercel`
2. From inside this folder, run `vercel`
3. Follow the prompts (log in, confirm project name). It deploys and gives you a live URL in under a minute.
4. `vercel --prod` to push it to your production `.vercel.app` domain.

## Editing later

Everything — HTML, CSS, and JS — is in `index.html`. Sections are marked with `id`s (`#work`, `#engineering`, `#about`, `#contact`) if you want to add or reorder anything.