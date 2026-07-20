# andy1love.com — static site

A faithful, dependency-free rebuild of the Squarespace site at
https://andy1love.com/. Plain HTML + CSS + a little JS. No build step, no
subscription — host it anywhere for free.

```
index.html            ACTIVE landing page (currently = template02)
template01/           saved landing: bio + link buttons  (preview /template01)
template02/           saved landing: name + socials only (preview /template02)
storytelling_kony/    the KONY storytelling course site
  index.html          course home (hero, video, cards, contact form)
  what/ who/ why/
  curriculum/         course subpages
mcu/                  Marvel filmography poster page
what/ who/ why/
curriculum/           redirect stubs (old top-level URLs → storytelling_kony/…)
404.html              not-found page (GitHub Pages picks it up automatically)
css/style.css         all styling
js/site.js            mobile menu + contact form  ← form configured here
images/               all images (downloaded from the old site, full res)
fonts/                self-hosted Oswald + Montserrat (free equivalents of
                      DIN Condensed / Proxima Nova, which are Adobe fonts
                      licensed through Squarespace and can't be copied)
CNAME                 tells GitHub Pages the custom domain
```

To switch the live landing page, copy a template over the root index and
push:

```bash
cp template01/index.html index.html   # or template02/index.html
git add -A && git commit -m "switch landing" && git push
```

(The template copies differ from the root only in their `<title>` and
og:url — cosmetic; copying as-is works fine.)

## Preview locally

Root-relative links (`/css/…`) need a local server — don't double-click the
HTML files, run:

```bash
cd ~/Desktop/py/andy1love_webpage
python3 -m http.server 8000
```

then open http://localhost:8000

## Contact form (the one thing Squarespace did server-side)

A static site has no server to receive form posts. The 質問・意見 contact form
(bottom of the course page) currently opens the visitor's **email app** with
the message pre-filled, addressed to the email set at the top of
`js/site.js` (`CONTACT_EMAIL`).

For submissions that arrive in your inbox without the visitor's email app:

1. Make a free account at https://formspree.io (50 submissions/month free) —
   or https://web3forms.com (no account, just an access key).
2. Create a form, copy its endpoint URL (looks like
   `https://formspree.io/f/abcdwxyz`).
3. Paste it into `FORM_ENDPOINT` at the top of `js/site.js`. Done — the
   form now submits in-page and shows a success message in Japanese.

## Going live (recommended: GitHub Pages — free, no server to maintain)

1. Create a free account at https://github.com, then a new **public**
   repository (e.g. `andy1love-site`).
2. Upload this folder. Either drag-and-drop all files on the repo page
   ("uploading an existing file"), or from Terminal:

   ```bash
   cd ~/Desktop/py/andy1love_webpage
   git init -b main
   git add -A
   git commit -m "andy1love.com static site"
   git remote add origin https://github.com/<YOUR_USERNAME>/andy1love-site.git
   git push -u origin main
   ```

3. On GitHub: repo **Settings → Pages** → "Deploy from a branch" →
   branch `main`, folder `/ (root)` → Save. After a minute the site is live
   at `https://<YOUR_USERNAME>.github.io/andy1love-site/`.
4. Still in **Settings → Pages**, enter `andy1love.com` under **Custom
   domain** (the `CNAME` file in this repo makes it stick). After the DNS
   step below passes its check, tick **Enforce HTTPS** — the SSL
   certificate is automatic and free.

Alternatives that work just as well: **Cloudflare Pages** or **Netlify**
(both have drag-and-drop upload and free custom domains + HTTPS).

## Point the GoDaddy domain at the new site

In GoDaddy → My Products → andy1love.com → **DNS**:

1. **Delete** the old Squarespace records:
   - any `A` records for `@` pointing at `198.185.159.144`,
     `198.185.159.145`, `198.49.23.144`, `198.49.23.145`
   - the `CNAME` for `www` pointing at `ext-cust.squarespace.com`
   - any `CNAME` like `xxxx.verify.squarespace.com`
2. **Add** the GitHub Pages records:

   | Type  | Name | Value                     |
   |-------|------|---------------------------|
   | A     | @    | 185.199.108.153           |
   | A     | @    | 185.199.109.153           |
   | A     | @    | 185.199.110.153           |
   | A     | @    | 185.199.111.153           |
   | CNAME | www  | `<YOUR_USERNAME>.github.io` |

3. Wait for DNS to propagate (usually minutes, worst case 48 h), then
   verify https://andy1love.com loads the new site.

## Cancel Squarespace — in this order

1. ✅ Content, images and design are all preserved in this folder.
2. Export mailing-list contacts from Squarespace (see Forms above).
3. Switch DNS (above) and confirm the new site is live at andy1love.com.
4. Squarespace → **Settings → Billing → Subscriptions** → cancel the site
   plan (or just let it expire). The domain is registered at GoDaddy, not
   Squarespace, so nothing about the domain itself is affected.
5. Keep paying GoDaddy's normal domain renewal — that's separate from
   Squarespace and is the only remaining cost (~$20/yr). Hosting is $0.

## Small differences from the Squarespace version

- Headings use **Oswald** and body text **Montserrat** (closest free
  substitutes for DIN Condensed / Proxima Nova, which can't legally be
  copied off Squarespace). Japanese text uses the same system fonts as
  before (Hiragino / Yu Gothic).
- Forms work via email app or Formspree (see above) instead of
  Squarespace's built-in form backend.
- The `/search` page (a built-in Squarespace feature, not linked anywhere
  in the nav) was not replicated.
- The YouTube embed uses the privacy-enhanced `youtube-nocookie.com`
  player.
