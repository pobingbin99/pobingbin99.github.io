/* =========================
   공통
========================= */

const root = document.documentElement;
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");

// "움직임 줄이기" 설정을 켠 사용자인지
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================
   Hero 등장 애니메이션
========================= */

window.addEventListener("load", () => {
    // 초기 상태가 한 번 그려진 뒤 클래스를 붙여야 transition이 동작
    requestAnimationFrame(() => {
        root.classList.add("is-loaded");

        // 등장 애니메이션이 끝나면 카드 기울기 반응을 빠르게 전환
        setTimeout(() => root.classList.add("is-ready"), 1400);
    });
});


/* =========================
   Mobile Menu
========================= */

const setMenu = (open) => {
    nav.classList.toggle("mobile-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
};

menuBtn.addEventListener("click", () => {
    setMenu(!nav.classList.contains("mobile-open"));
});

// 메뉴 항목을 누르면 닫기
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

// ESC 키로 닫기
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
});


/* =========================
   스크롤 연동: 헤더 / 진행바 / 맨 위로 버튼
========================= */

const progress = document.querySelector(".scroll-progress");
const toTop = document.querySelector(".to-top");
let lastY = window.scrollY;
let ticking = false;

const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    // 1) 진행바
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    // 2) 헤더 그림자
    header.classList.toggle("is-scrolled", y > 10);

    // 3) 아래로 내리면 헤더 숨김, 위로 올리면 표시 (모바일 메뉴가 열려 있으면 유지)
    const goingDown = y > lastY && y > 200;
    header.classList.toggle("is-hidden", goingDown && !nav.classList.contains("mobile-open"));

    // 4) 맨 위로 버튼
    toTop.classList.toggle("is-visible", y > 600);

    lastY = y;
    ticking = false;
};

// 스크롤마다 바로 실행하지 않고 화면 그리는 타이밍에 한 번만 실행 (성능)
window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
}, { passive: true });

onScroll();


/* =========================
   Scroll Reveal
========================= */

// data-stagger 안의 자식들에게 순서대로 지연시간 부여
document.querySelectorAll("[data-stagger]").forEach((group) => {
    [...group.children].forEach((child, i) => {
        child.style.setProperty("--d", `${i * 90}ms`);
    });
});

const revealTargets = document.querySelectorAll("[data-reveal], [data-stagger]");

if ("IntersectionObserver" in window && !reduceMotion) {
    // clip-path로 완전히 가려진 요소는 화면에 들어와도 감지되지 않아서,
    // data-reveal="clip" 요소는 부모를 대신 감시한다.
    const watchMap = new Map();   // 감시 대상 → 등장시킬 요소들

    revealTargets.forEach((el) => {
        const watchEl = el.dataset.reveal === "clip" ? el.parentElement : el;
        if (!watchMap.has(watchEl)) watchMap.set(watchEl, []);
        watchMap.get(watchEl).push(el);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            watchMap.get(entry.target).forEach((el) => el.classList.add("is-visible"));
            observer.unobserve(entry.target);   // 한 번 나타나면 감시 종료
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
    });

    watchMap.forEach((_, watchEl) => revealObserver.observe(watchEl));
} else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
}


/* =========================
   Navigation Active (현재 보고 있는 섹션 표시)
========================= */

const navLinks = [...nav.querySelectorAll("a")];
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, {
    rootMargin: "-45% 0px -50% 0px"   // 화면 가운데 근처에 들어온 섹션을 활성화
});

sections.forEach((section) => spyObserver.observe(section));


/* =========================
   Marquee: 끊김 없이 돌도록 내용 복제
========================= */

const track = document.querySelector(".marquee-track");

if (track) {
    // 2세트가 되면 -50% 이동 시 이음새 없이 반복됨 (넓은 화면 대비 4세트)
    track.innerHTML = track.innerHTML.repeat(4);
}


/* =========================
   Hero 단어 로테이터
========================= */

const words = document.querySelectorAll(".rotator-word");
let wordIndex = 0;

if (words.length > 1 && !reduceMotion) {
    setInterval(() => {
        const current = words[wordIndex];
        wordIndex = (wordIndex + 1) % words.length;
        const next = words[wordIndex];

        current.classList.remove("is-active");
        current.classList.add("is-leaving");
        next.classList.remove("is-leaving");
        next.classList.add("is-active");

        // 위로 사라진 단어는 다시 아래 대기 위치로
        setTimeout(() => current.classList.remove("is-leaving"), 600);
    }, 2400);
}


/* =========================
   Hero 카드 기울기 (마우스가 있는 기기에서만)
========================= */

const card = document.querySelector(".hero-card");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (card && canHover && !reduceMotion) {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 ~ 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.classList.add("is-tilting");
        card.style.setProperty("--ry", `${x * 10}deg`);
        card.style.setProperty("--rx", `${y * -10}deg`);
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("is-tilting");
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
    });
}


/* =========================
   숫자 카운트업
========================= */

const counters = document.querySelectorAll("[data-count]");

const countUp = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);          // 끝으로 갈수록 천천히
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
};

if (reduceMotion || !("IntersectionObserver" in window)) {
    counters.forEach((el) => (el.textContent = el.dataset.count));
} else {
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            countUp(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.6 });

    counters.forEach((el) => countObserver.observe(el));
}


/* =========================
   이메일 복사 + 토스트
========================= */

const toast = document.querySelector(".toast");
let toastTimer;

const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
};

document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
        const text = btn.dataset.copy;
        try {
            await navigator.clipboard.writeText(text);
            showToast("이메일 주소를 복사했어요");
        } catch {
            // 복사가 막힌 환경(파일로 직접 연 경우 등)에서는 메일 앱 열기
            location.href = `mailto:${text}`;
        }
    });
});


/* =========================
   Hero 링 필드 (마우스 주변의 링이 커지고 초록색으로 변함)
========================= */

(() => {
    const heroEl = document.querySelector(".hero");
    const canvas = document.querySelector(".ring-field");
    if (!heroEl || !canvas) return;

    const ctx = canvas.getContext("2d");

    // 조절용 값
    const GAP = 30;            // 링 사이 간격(px)
    const R_MIN = 2.5;         // 평소 링 반지름
    const R_MAX = 10;          // 마우스 가까이에서 최대 반지름
    const REACH = 160;         // 마우스 영향 범위(px)
    const EASE = 0.12;         // 따라가는 부드러움 (작을수록 느리게)
    const BASE = [200, 200, 195];   // 평소 링 색
    const ACCENT = [61, 122, 90];   // 마우스 근처 링 색 (포인트 그린)

    let w = 0, h = 0, dpr = 1;
    let rings = [];
    let mouse = null;
    let running = false;

    const build = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = heroEl.clientWidth;
        h = heroEl.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cols = Math.floor(w / GAP) + 1;
        const rows = Math.floor(h / GAP) + 1;
        const offX = (w - (cols - 1) * GAP) / 2;
        const offY = (h - (rows - 1) * GAP) / 2;

        rings = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                rings.push({ x: offX + c * GAP, y: offY + r * GAP, v: 0 });
            }
        }
        draw();
    };

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.lineWidth = 1.2;

        for (const p of rings) {
            const rad = R_MIN + (R_MAX - R_MIN) * p.v;
            const cr = Math.round(BASE[0] + (ACCENT[0] - BASE[0]) * p.v);
            const cg = Math.round(BASE[1] + (ACCENT[1] - BASE[1]) * p.v);
            const cb = Math.round(BASE[2] + (ACCENT[2] - BASE[2]) * p.v);

            ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${0.55 + 0.45 * p.v})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
            ctx.stroke();
        }
    };

    // 각 링의 목표값(마우스와 가까울수록 1)으로 부드럽게 이동
    const tick = () => {
        let moving = false;

        for (const p of rings) {
            let target = 0;
            if (mouse) {
                const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                if (d < REACH) {
                    const t = 1 - d / REACH;
                    target = t * t * (3 - 2 * t);       // 가장자리가 부드럽게 줄어드는 곡선
                }
            }

            const diff = target - p.v;
            if (Math.abs(diff) > 0.002) {
                p.v += diff * EASE;
                moving = true;
            } else {
                p.v = target;
            }
        }

        draw();

        if (moving) requestAnimationFrame(tick);
        else running = false;
    };

    const start = () => {
        if (running) return;
        running = true;
        requestAnimationFrame(tick);
    };

    build();

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 150);
    });

    // 마우스가 있는 기기에서만 반응 (터치 기기와 '움직임 줄이기'는 정지된 링만 표시)
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasMouse || reduceMotion) return;

    heroEl.addEventListener("pointermove", (e) => {
        const rect = heroEl.getBoundingClientRect();
        mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        start();
    });

    heroEl.addEventListener("pointerleave", () => {
        mouse = null;
        start();
    });
})();

