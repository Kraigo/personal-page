/* ============================================================
   Igor K. — personal page
   No dependencies. Everything degrades gracefully without JS.
   ============================================================ */

(function () {
    'use strict';

    // Marks that JS is available, so CSS can hide reveal elements only when
    // there is something around to reveal them again.
    document.documentElement.classList.add('js');

    var BIRTH_YEAR = 1990;
    var CAREER_START_YEAR = 2013;

    document.addEventListener('DOMContentLoaded', function () {
        var now = new Date();

        setText('js-year', now.getFullYear());
        setText('js-age', now.getFullYear() - BIRTH_YEAR);
        setText('js-years', now.getFullYear() - CAREER_START_YEAR);

        initLinks();
        initLanguage();
        initThemeToggle();
        initScrollReveal();
        initNavState();
    });

    function setText(id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = String(value);
    }


    /* ── Obfuscated links & address ─────────────────────────────
       No URL and no email address appears literally in the served
       HTML — each is stored base64-encoded and reversed, and only
       becomes a real href once this runs. That defeats the crawlers
       and address harvesters that regex over raw markup; it does not
       defeat anything that executes JavaScript, and it is not meant
       to. See robots.txt for the part that asks nicely.
       ───────────────────────────────────────────────────────────── */

    function reveal(value) {
        try {
            return atob(value).split('').reverse().join('');
        } catch (e) {
            return '';
        }
    }

    function initLinks() {
        forEach(document.querySelectorAll('[data-x]'), function (el) {
            if (el.classList.contains('js-mail')) {
                var address = reveal(el.getAttribute('data-y')) + '@' +
                    reveal(el.getAttribute('data-x'));
                el.href = 'mai' + 'lto:' + address;
                if (el.classList.contains('js-mail-text')) el.textContent = address;
            } else {
                el.href = reveal(el.getAttribute('data-x'));
            }
            // Drop the payload once it has been used, so a late DOM scrape
            // finds only what a visitor would have seen anyway.
            el.removeAttribute('data-x');
            el.removeAttribute('data-y');
        });
    }


    /* ── Language ───────────────────────────────────────────────
       English lives in the markup, so the page is complete and
       readable before this file runs. Only the Ukrainian strings
       are carried here; switching back restores the original text
       captured from the DOM, which means EN is never duplicated.
       ───────────────────────────────────────────────────────────── */

    var UK = {
        'a11y.skip': 'Перейти до вмісту',
        'a11y.sections': 'Розділи',
        'a11y.language': 'Мова',
        'a11y.theme': 'Змінити тему',
        'a11y.glance': 'Коротко',

        'nav.now': 'Зараз',
        'nav.strengths': 'Сильні сторони',
        'nav.stack': 'Стек',
        'nav.ai': 'AI',
        'nav.work': 'Проєкти',
        'nav.contact': 'Контакти',

        'btn.email': 'Написати',

        'hero.status': 'Розглядаю senior і lead позиції',
        'hero.role': 'Mobile & Web інженер — Flutter і Angular',
        'hero.lede': 'Flutter-застосунки в App Store і Google Play, Angular-системи ' +
            'в щоденній роботі enterprise-команд. Тринадцять років у продакшн-розробці.',
        'hero.meta.country': 'Україна',
        'hero.meta.remote': 'Віддалено, UTC+2',
        'hero.meta.age': 'років',
        'hero.meta.english': 'Англійська: upper-intermediate',

        'stats.years': 'років у продакшн-розробці',
        'stats.apps': 'застосунків у App Store і Google Play',
        'stats.enterprise': 'років на довгострокових enterprise-проєктах',

        'now.eyebrow': '01 — Зараз',
        'now.title': 'Над чим працюю',
        'now.since': 'З квітня 2025',
        'now.company': 'Aya Healthcare · платформа медичного стафінгу',
        'now.text1': 'Бізнес-критична функціональність платформи медичного стафінгу, ' +
            'якою щодня користуються тисячі медиків і рекрутерів: нова функціональність, ' +
            'робота з UI, підтримка продакшену — веб на Angular, мобільні застосунки на Flutter.',
        'now.text2': 'Окрім розробки — аналіз вимог, оцінка задач і ризиків ' +
            'у складі Agile-команди.',

        'strengths.eyebrow': '02 — Сильні сторони',
        'strengths.title': 'У чому я сильний',
        'strengths.note.a': 'Повна історія —',
        'strengths.note.b': 'у LinkedIn',
        'strengths.note.c': '. Тут — коротко.',
        'strengths.mobile.title': 'Кросплатформна мобільна розробка',
        'strengths.mobile.text': 'Flutter-застосунки повного циклу: архітектура, UI, ' +
            'релізи в сторах, підтримка в продакшені. Провів міграцію з NativeScript ' +
            'на Flutter без зупинки робочих застосунків.',
        'strengths.web.title': 'Enterprise-веб',
        'strengths.web.text': 'Angular в enterprise-масштабі: передбачуваний стан, ' +
            'тестовані модулі, код, який команда може підтримувати роками.',
        'strengths.design.title': 'Реалізація дизайну',
        'strengths.design.text': 'Бекграунд дизайнера: точно реалізую макети з Figma — ' +
            'адаптивно й доступно — і можу предметно обговорювати дизайн-рішення.',
        'strengths.ship.title': 'Реліз і підтримка',
        'strengths.ship.text': 'Публікація в сторах, CI/CD, код-рев’ю, оцінка задач. ' +
            'Багаторічна підтримка власного коду в продакшені.',

        'stack.eyebrow': '03 — Стек',
        'stack.title': 'З чим працюю',
        'stack.mobile': 'Мобільна',
        'stack.mobile.val': 'Flutter · Dart · Provider · Firebase · iOS і Android · ' +
            'релізи в сторах · push-сповіщення',
        'stack.web': 'Веб',
        'stack.web.val': 'Angular · TypeScript · RxJS · NgRx · Signals · SCSS · ' +
            'Angular Material · адаптивна верстка · i18n',
        'stack.backend': 'Бекенд',
        'stack.backend.val': 'Node.js · Bun · NestJS · Express · Hono · Drizzle · ' +
            'PostgreSQL · SQLite · .NET / C# · REST API',
        'stack.ai': 'AI',
        'stack.ai.val': 'Claude API · Claude Code · MCP · LLM-агенти та інструменти · ' +
            'ембединги · векторний пошук · проєктування промптів',
        'stack.testing': 'Тестування',
        'stack.testing.val': 'Jest · Jasmine / Karma · widget-тести · код-рев’ю',
        'stack.delivery': 'Процеси',
        'stack.delivery.val': 'Git · GitHub Actions · Docker · Linux · Nginx · VPS · ' +
            'Sentry · Jira · CI/CD · Agile / Scrum',
        'stack.design': 'Дизайн',

        'ai.eyebrow': '04 — AI',
        'ai.title': 'Як я використовую AI',
        'ai.note': 'Там, де це дає реальний результат.',
        'ai.agents.title': 'Агенти',
        'ai.agents.text': 'LLM-агенти з доступом до інструментів: чітко окреслені задачі, ' +
            'структурований вивід, контроль людини на критичних кроках.',
        'ai.code.title': 'AI у кодовій базі',
        'ai.code.text': 'Щоденна практика: код-рев’ю, рефакторинг, документація, ' +
            'прототипи — з обов’язковою перевіркою результату.',
        'ai.embed.title': 'Ембединги та пошук',
        'ai.embed.text': 'Векторний пошук по приватних даних: розбиття на фрагменти, ' +
            'індексація, налаштування якості видачі.',
        'ai.auto.title': 'Автоматизація',
        'ai.auto.text': 'Боти та пайплайни для рутинних процесів, із LLM-кроком там, ' +
            'де фіксованих правил недостатньо.',

        'work.eyebrow': '05 — Проєкти',
        'work.title': 'Власні проєкти',
        'work.note': 'Клієнтські проєкти — під NDA. Нижче публічні.',
        'work.group.apps': 'Мобільні застосунки',
        'work.group.packages': 'Пакети та інструменти',
        'work.daykeep': 'Віджети для головного екрана: рахують дні від обраної дати.',
        'work.flipo.kind': 'iOS і Android · Google Play',
        'work.flipo': 'Флеш-картки з AI-ілюстраціями та інтервальним повторенням ' +
            'для вивчення мов.',
        'work.solitaire.kind': 'Гра',
        'work.solitaire': 'Класичний пасьянс на Flutter: власні анімації та робота з жестами.',
        'work.deepmenu.kind': 'Flutter-пакет · pub.dev',
        'work.deepmenu': 'Контекстне меню в стилі iOS peek and pop: відкривається довгим ' +
            'натисканням із зумом і розмиттям тла.',
        'work.fb2html.kind': 'npm-пакет',
        'work.fb2html': 'Парсер на Node.js: конвертує книжки FB2 у чистий HTML.',
        'work.qr.kind': 'Веб-застосунок',
        'work.qr': 'Динамічні QR-картки: адресу можна змінити без передруку коду.',

        'contact.eyebrow': '06 — Контакти',
        'contact.title': 'Обговорімо деталі',
        'contact.text': 'Повне резюме, деталі проєктів і доступність — у дзвінку або листом.',

        'footer.text': 'Igor K. — дизайн і код мої.',

        'doc.title': 'Igor K. — Mobile & Web інженер (Flutter і Angular)'
    };

    function initLanguage() {
        var toggle = document.getElementById('lang-toggle');
        var buttons = document.querySelectorAll('.lang-btn');

        // Snapshot the English already in the DOM — that is the "en" dictionary.
        var slots = [];
        forEach(document.querySelectorAll('[data-i18n], [data-i18n-label]'), function (el) {
            var textKey = el.getAttribute('data-i18n');
            var labelKey = el.getAttribute('data-i18n-label');
            slots.push({
                el: el,
                textKey: textKey,
                labelKey: labelKey,
                // Collapse the newlines the markup wraps on, so a swapped-in
                // string and the original are whitespace-equivalent.
                text: textKey ? el.textContent.replace(/\s+/g, ' ').trim() : null,
                label: labelKey ? el.getAttribute('aria-label') : null
            });
        });

        var enTitle = document.title;

        function apply(lang) {
            var dict = lang === 'uk' ? UK : null;

            slots.forEach(function (slot) {
                if (slot.textKey) {
                    var text = dict && dict[slot.textKey];
                    slot.el.textContent = text || slot.text;
                }
                if (slot.labelKey) {
                    var label = dict && dict[slot.labelKey];
                    slot.el.setAttribute('aria-label', label || slot.label);
                }
            });

            document.title = (dict && dict['doc.title']) || enTitle;
            document.documentElement.lang = lang;

            forEach(buttons, function (btn) {
                var on = btn.getAttribute('data-lang') === lang;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-pressed', String(on));
            });
        }

        if (toggle) {
            toggle.addEventListener('click', function (event) {
                var btn = event.target.closest('.lang-btn');
                if (!btn) return;
                var lang = btn.getAttribute('data-lang');
                apply(lang);
                try {
                    sessionStorage.setItem('lang', lang);
                } catch (e) { /* private mode — the choice lasts this page view */ }
            });
        }

        // The inline head script already resolved stored choice vs. browser
        // language and stamped it on <html>; follow whatever it decided.
        apply(document.documentElement.lang === 'uk' ? 'uk' : 'en');
    }


    /* ── Theme ──────────────────────────────────────────────── */

    function initThemeToggle() {
        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        var media = window.matchMedia('(prefers-color-scheme: dark)');

        var isDark = function () {
            var stored = document.documentElement.dataset.theme;
            if (stored === 'dark') return true;
            if (stored === 'light') return false;
            return media.matches;
        };

        var sync = function () {
            toggle.setAttribute('aria-pressed', String(isDark()));

            // The theme-color metas carry media="(prefers-color-scheme: …)",
            // so on their own they follow the SYSTEM theme. Once the visitor
            // picks a theme here, repaint the browser chrome (iOS Safari bars,
            // Android address bar) to match the explicit choice.
            var stored = document.documentElement.dataset.theme;
            if (stored === 'dark' || stored === 'light') {
                var colour = stored === 'dark' ? '#0b0b0d' : '#ffffff';
                forEach(document.querySelectorAll('meta[name="theme-color"]'),
                    function (m) { m.setAttribute('content', colour); });
            }
        };

        toggle.addEventListener('click', function () {
            var next = isDark() ? 'light' : 'dark';
            document.documentElement.dataset.theme = next;
            try {
                localStorage.setItem('theme', next);
            } catch (e) { /* private mode — the choice just won't persist */ }
            sync();
        });

        // Follow the system while the user hasn't made an explicit choice.
        if (media.addEventListener) media.addEventListener('change', sync);

        sync();
    }


    /* ── Scroll reveal ──────────────────────────────────────── */

    function initScrollReveal() {
        var targets = document.querySelectorAll('.reveal');
        if (!targets.length) return;

        // No IntersectionObserver (or reduced motion) — show everything at once.
        if (!('IntersectionObserver' in window) ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            forEach(targets, function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
            // threshold 0: any sliver of the element counts. A percentage
            // threshold can be unreachable for elements taller than the
            // viewport, which would leave them hidden for good.
        }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

        // Stagger siblings inside a group so lists cascade instead of popping.
        forEach(targets, function (el) {
            var siblings = el.parentElement
                ? el.parentElement.querySelectorAll(':scope > .reveal')
                : [];
            var index = indexOf(siblings, el);
            if (index > 0) {
                el.style.transitionDelay = Math.min(index, 6) * 60 + 'ms';
            }
            observer.observe(el);
        });
    }


    /* ── Nav: shadow on scroll + active section ─────────────── */

    function initNavState() {
        var nav = document.getElementById('nav');
        var links = document.querySelectorAll('.nav-links a[href^="#"]');

        if (nav) {
            // The name belongs in one place at a time: while the hero's <h1>
            // is on screen the bar shows only its monogram, and it picks the
            // name up once that heading has slipped behind it.
            var title = document.querySelector('.hero-title');
            var barHeight = nav.offsetHeight || 60;

            var onScroll = function () {
                nav.classList.toggle('is-stuck', window.scrollY > 8);
                if (title) {
                    nav.classList.toggle(
                        'has-name',
                        title.getBoundingClientRect().bottom <= barHeight
                    );
                }
            };

            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', function () {
                barHeight = nav.offsetHeight || 60;
                onScroll();
            }, { passive: true });
            // Covers a reload that restores a scroll position, and a load
            // straight onto a #fragment.
            window.addEventListener('load', onScroll);
            onScroll();
        }

        if (!links.length || !('IntersectionObserver' in window)) return;

        var sections = [];
        forEach(links, function (link) {
            var section = document.querySelector(link.getAttribute('href'));
            if (section) sections.push({ link: link, section: section });
        });
        if (!sections.length) return;

        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var match = find(sections, function (item) {
                    return item.section === entry.target;
                });
                if (!match) return;
                match.link.classList.toggle('is-active', entry.isIntersecting);
            });
        }, {
            // A band across the middle of the viewport: whichever section
            // crosses it is the one the reader is actually looking at.
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0
        });

        sections.forEach(function (item) { spy.observe(item.section); });
    }


    /* ── Tiny helpers (NodeList-friendly) ───────────────────── */

    function forEach(list, fn) {
        Array.prototype.forEach.call(list, fn);
    }

    function indexOf(list, item) {
        return Array.prototype.indexOf.call(list, item);
    }

    function find(list, fn) {
        for (var i = 0; i < list.length; i++) {
            if (fn(list[i])) return list[i];
        }
        return null;
    }
})();
