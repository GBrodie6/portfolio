# Portfolio — Standing Conventions

Single-file static site (`index.html`, no build step, no dependencies).

## Automatic workflow — every session, no need to ask

On every session in this repo, once changes are made and confirmed working, do all of
the following automatically, without waiting for me to run any git or deploy commands myself:

1. **Build-check if applicable.** This is a static site with no build step, so the
   build check is: confirm `index.html` is well-formed HTML and any inline JS parses.
   If a real build step is ever added, run it and make sure it passes first.
2. **Commit.** Stage all changes and commit with a clear, descriptive message.
3. **Push to origin.** Push the commit to `origin main`.
4. **Deploy to Vercel production.** Deploy with `vercel --prod` (framework preset:
   Other — static, no build command). If the project is linked to Vercel through
   GitHub, the push to `main` already triggers a production redeploy; otherwise run
   the CLI deploy.

I should never have to run git or deploy commands myself. Take it end to end.

## Project facts

- Deploy target: Vercel, framework preset **Other** (static, no build command).
- GitHub: `GBrodie6/portfolio` (public).
- Contact email and profile links live in the Contact section of `index.html`.
