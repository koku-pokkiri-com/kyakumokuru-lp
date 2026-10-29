/**
 * 共通フォーム配線スクリプト（グループC＝静的HTMLサイト用）
 *
 * 既存のフォームHTMLをほぼ触らずに、/api/contact へ送信できるようにする。
 * 8サイト全部でこのファイルをそのままコピーして使う。
 *
 * ■ 使い方（各サイトでの編集は3か所だけ）
 *   1. <form> に data-relay-form を付ける
 *   2. メール欄・お名前欄・本文欄に data-relay-role="email" / "name" / "message" を付ける
 *   3. </body> の直前に <script src="/js/form-relay.js" defer></script> を置く
 *
 *   任意：フォーム内に <div data-relay-status></div> を置くとそこに結果を表示する。
 *        無ければフォーム末尾に自動で作る。
 *        送信失敗時の案内文は <form data-relay-fallback="お電話 03-0000-0000 まで"> で上書きできる。
 *
 * ■ 設計上の約束（2026-07-27 の全社事故を受けて）
 *   サーバが ok を返した時だけ成功表示を出す。
 *   通信失敗・サーバエラーは必ず赤字のエラーとして訪問者に見せる。
 *   「とりあえず成功と出しておく」は絶対に書かない。
 */
(function () {
  'use strict';

  var ENDPOINT = '/api/contact';
  var DEFAULT_FALLBACK = 'お手数ですが、お電話またはメールで直接ご連絡ください。';

  function clean(s) {
    return String(s || '')
      .replace(/\s+/g, ' ')
      .replace(/必須|任意/g, '')
      .replace(/[*※]/g, '')
      .trim()
      .slice(0, 40);
  }

  function labelFor(el, form) {
    // 1. 明示指定
    if (el.getAttribute('data-relay-label')) return el.getAttribute('data-relay-label');

    // 2. label[for=id]
    if (el.id) {
      var l = form.querySelector('label[for="' + el.id + '"]');
      if (l && clean(l.textContent)) return clean(l.textContent);
    }

    // 3. 入力欄を包んでいる label
    var parentLabel = el.closest && el.closest('label');
    if (parentLabel && clean(parentLabel.textContent)) return clean(parentLabel.textContent);

    // 4. 同じブロック内にある label を親方向に3段まで探す
    //    （.form-group > label + input という一般的な組み方に対応する）
    var node = el.parentElement;
    for (var i = 0; i < 3 && node && node !== form; i++) {
      var lb = node.querySelector('label');
      if (lb && clean(lb.textContent)) return clean(lb.textContent);
      node = node.parentElement;
    }

    // 5. 最後の手段
    if (el.placeholder) return el.placeholder;
    if (el.name) return el.name;
    return '項目';
  }

  function valueOf(el, form) {
    if (el.type === 'checkbox') {
      if (!el.name) return el.checked ? 'はい' : '';
      var group = form.querySelectorAll('input[type="checkbox"][name="' + el.name + '"]');
      if (group.length > 1) return null; // グループはまとめて後段で処理
      return el.checked ? 'はい' : 'いいえ';
    }
    if (el.type === 'radio') return null; // 後段でまとめる
    return el.value;
  }

  function collect(form) {
    var fields = [];
    var roles = { email: '', name: '', message: '', route: '' };
    var seenRadio = {};
    var els = form.querySelectorAll('input, textarea, select');

    Array.prototype.forEach.call(els, function (el) {
      if (el.disabled) return;
      if (el.type === 'submit' || el.type === 'button' || el.type === 'hidden') return;
      if (el.hasAttribute('data-relay-honeypot')) return;

      var role = el.getAttribute('data-relay-role');
      if (role && roles.hasOwnProperty(role)) roles[role] = (el.value || '').trim();

      if (el.type === 'radio') {
        if (seenRadio[el.name]) return;
        seenRadio[el.name] = true;
        var checked = form.querySelector('input[type="radio"][name="' + el.name + '"]:checked');
        fields.push({ label: labelFor(el, form), value: checked ? checked.value : '' });
        return;
      }
      if (el.type === 'checkbox' && el.name) {
        var group = form.querySelectorAll('input[type="checkbox"][name="' + el.name + '"]');
        if (group.length > 1) {
          if (seenRadio['cb:' + el.name]) return;
          seenRadio['cb:' + el.name] = true;
          var vals = [];
          Array.prototype.forEach.call(group, function (c) {
            if (c.checked) vals.push(c.value || 'はい');
          });
          fields.push({ label: labelFor(el, form), value: vals.join('、') });
          return;
        }
      }
      var v = valueOf(el, form);
      if (v === null) return;
      fields.push({ label: labelFor(el, form), value: v });
    });

    return { fields: fields, roles: roles };
  }

  function statusBox(form) {
    var box = form.querySelector('[data-relay-status]');
    if (!box) {
      box = document.createElement('div');
      box.setAttribute('data-relay-status', '');
      box.style.marginTop = '16px';
      form.appendChild(box);
    }
    return box;
  }

  function show(box, kind, text) {
    box.textContent = text;
    box.style.display = 'block';
    box.style.padding = '12px 14px';
    box.style.borderRadius = '6px';
    box.style.lineHeight = '1.7';
    box.style.fontSize = '14px';
    if (kind === 'error') {
      box.style.background = '#fdecea';
      box.style.color = '#a3231b';
      box.style.border = '1px solid #f5c6c2';
      box.setAttribute('role', 'alert');
    } else if (kind === 'ok') {
      box.style.background = '#eaf6ec';
      box.style.color = '#1c6b2c';
      box.style.border = '1px solid #c3e3ca';
      box.setAttribute('role', 'status');
    } else {
      box.style.background = '#f2f2f2';
      box.style.color = '#555';
      box.style.border = '1px solid #e0e0e0';
      box.setAttribute('role', 'status');
    }
  }

  function wire(form) {
    var fallback = form.getAttribute('data-relay-fallback') || DEFAULT_FALLBACK;
    var endpoint = form.getAttribute('data-relay-endpoint') || ENDPOINT;

    // ハニーポット（画面には出さない）
    var hp = document.createElement('input');
    hp.type = 'text';
    hp.name = 'company_hp';
    hp.setAttribute('data-relay-honeypot', '');
    hp.tabIndex = -1;
    hp.autocomplete = 'off';
    hp.setAttribute('aria-hidden', 'true');
    hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
    form.appendChild(hp);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var box = statusBox(form);
      var btn = form.querySelector('[type="submit"]');
      var btnText = btn ? btn.textContent : '';

      var picked = collect(form);
      var email = picked.roles.email;
      var message = picked.roles.message;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show(box, 'error', 'メールアドレスの形式をご確認ください。');
        return;
      }
      if (!message) {
        show(box, 'error', 'お問い合わせ内容をご入力ください。');
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = '送信中...';
      }
      show(box, 'info', '送信しています…');

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: picked.fields,
          email: email,
          name: picked.roles.name,
          message: message,
          route: picked.roles.route,
          hp: hp.value,
        }),
      })
        .then(function (res) {
          return res
            .json()
            .catch(function () {
              return {};
            })
            .then(function (json) {
              return { res: res, json: json };
            });
        })
        .then(function (r) {
          // サーバが明示的に ok を返した時だけ成功にする
          if (r.res.ok && r.json && r.json.ok === true) {
            show(
              box,
              'ok',
              'お問い合わせを送信しました。担当者より折り返しご連絡いたします。'
            );
            form.reset();
          } else {
            show(
              box,
              'error',
              (r.json && r.json.error) || '送信に失敗しました。' + fallback
            );
          }
        })
        .catch(function () {
          show(box, 'error', '通信に失敗したため送信できませんでした。' + fallback);
        })
        .then(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = btnText;
          }
        });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form[data-relay-form]');
    Array.prototype.forEach.call(forms, wire);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
