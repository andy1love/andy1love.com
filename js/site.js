/* andy1love.com — site behavior: mobile menu + contact form.
 *
 * CONTACT FORM: Squarespace used to receive form submissions for you. A
 * static site has no server, so out of the box the 質問・意見 form opens the
 * visitor's email app with the message pre-filled (sent to CONTACT_EMAIL
 * below).
 *
 * For "real" form submissions that land in your inbox without the visitor's
 * email app, create a free endpoint at https://formspree.io (or
 * https://web3forms.com), then paste its URL into FORM_ENDPOINT below.
 * See README.md for the walkthrough.
 */

// Assembled at runtime so the address isn't scraped from the HTML by spam bots.
var CONTACT_EMAIL = ['sns.satoki', 'gmail.com'].join('@'); // ← change if needed
var FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/abcdwxyz'

(function () {
  'use strict';

  // ---------- mobile menu ----------
  var toggle = document.querySelector('.menu-toggle');
  var close = document.querySelector('.overlay-close');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.add('menu-open');
    });
  }
  if (close) {
    close.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
    });
  }

  // ---------- forms ----------
  function setStatus(form, msg) {
    var el = form.querySelector('.form-status');
    if (el) el.textContent = msg;
  }

  function handleSubmit(form, subject, buildBody) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var data = new FormData(form);

      if (FORM_ENDPOINT) {
        setStatus(form, '送信中…');
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        })
          .then(function (res) {
            if (res.ok) {
              form.reset();
              setStatus(form, '送信しました。ありがとうございます！');
            } else {
              throw new Error('bad response');
            }
          })
          .catch(function () {
            setStatus(form, '送信に失敗しました。時間をおいて再度お試しください。');
          });
      } else {
        var mailto =
          'mailto:' +
          CONTACT_EMAIL +
          '?subject=' +
          encodeURIComponent(subject) +
          '&body=' +
          encodeURIComponent(buildBody(data));
        window.location.href = mailto;
        setStatus(form, 'メールアプリが開きます。そのまま送信してください。');
      }
    });
  }

  var contact = document.querySelector('[data-form="contact"]');
  if (contact) {
    handleSubmit(contact, '質問・意見 (andy1love.com)', function (data) {
      return (
        'Name: ' + (data.get('name') || '') +
        '\nEmail: ' + (data.get('email') || '') +
        '\n\n' + (data.get('message') || '')
      );
    });
  }

})();
