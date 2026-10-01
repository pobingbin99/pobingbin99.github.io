/* =========================
   Tech Stack 데이터
   - icon: 로고 이미지 주소 (없거나 깨지면 이니셜 배지로 대체)
   - desc / projects: 클릭했을 때 뜨는 창에 표시
========================= */

const SI = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;
const DI = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

const STACK = [
    {
        group: "Frontend",
        items: [
            { name: "React", icon: SI("react", "61DAFB"),
              desc: "리뷰 작성·조회·수정 화면을 직접 구현했어요. React Query로 서버 상태를 관리하고, 무한 스크롤과 커스텀 훅 분리까지 적용해 봤어요.",
              projects: ["Peek&Pick", "CarTalk"] },
            { name: "Next.js", icon: SI("nextdotjs", "000000"),
              desc: "App Router 기반으로 페이지를 구성하고, NextAuth.js 로그인과 Vercel 배포까지 경험했어요.",
              projects: ["Rabbit Habit"] },
            { name: "TypeScript", icon: SI("typescript", "3178C6"),
              desc: "프론트엔드 프로젝트를 모두 TypeScript로 진행했어요. API 응답과 컴포넌트 props에 타입을 정의해 사용해요.",
              projects: ["Peek&Pick", "Rabbit Habit", "CarTalk"] },
            { name: "JavaScript", icon: SI("javascript", "F7DF1E"),
              desc: "프레임워크 없이 DOM 조작과 이벤트 처리로 화면을 만들 수 있어요. 이 포트폴리오 사이트도 바닐라 JS로 만들었어요.",
              projects: ["Portfolio"] },
            { name: "Tailwind CSS", icon: SI("tailwindcss", "06B6D4"),
              desc: "유틸리티 클래스로 반응형 화면을 빠르게 구성해요. 세 프로젝트의 화면을 모두 Tailwind로 만들었어요.",
              projects: ["Peek&Pick", "Rabbit Habit", "CarTalk"] },
        ],
    },
    {
        group: "Backend",
        items: [
            { name: "Java", icon: DI("java/java-original.svg"),
              desc: "객체지향 설계로 기능을 나눠 구현할 수 있어요. 소켓과 스레드로 실시간 1:1 대결 기능을 만들어 봤어요.",
              projects: ["Gotcha-Fish", "Peek&Pick"] },
            { name: "Spring Boot", icon: SI("springboot", "6DB33F"),
              desc: "리뷰 CRUD API와 다중 이미지 업로드(multipart)를 구현했어요. 작성자 검증으로 권한 없는 요청을 막는 처리도 했어요.",
              projects: ["Peek&Pick"] },
            { name: "Spring Security", icon: SI("springsecurity", "6DB33F"),
              desc: "인증·인가 흐름과 필터 체인 구조를 이해하고 있어요. 프로젝트에 적용하며 더 익히는 중이에요.",
              projects: [] },
            { name: "Spring AI", icon: SI("spring", "6DB33F"),
              desc: "ChatClient와 OpenAI로 사용자 국적에 맞춘 리뷰 번역 기능을 만들었어요. 프롬프트 템플릿으로 비속어 순화도 처리했어요.",
              projects: ["Peek&Pick"] },
            { name: "JPA", icon: "",
              desc: "엔티티 연관관계를 설계하고, Pageable로 최신순·좋아요순 정렬 페이징 API를 만들었어요.",
              projects: ["Peek&Pick"] },
            { name: "QueryDSL", icon: "",
              desc: "조건에 따라 바뀌는 동적 쿼리를 작성해 봤어요.",
              projects: [] },
        ],
    },
    {
        group: "Database",
        items: [
            { name: "PostgreSQL", icon: SI("postgresql", "4169E1"),
              desc: "서비스 데이터베이스로 사용하며 테이블 설계와 조회 쿼리를 다뤄 봤어요.",
              projects: ["Peek&Pick", "Rabbit Habit"] },
            { name: "MySQL", icon: SI("mysql", "4479A1"),
              desc: "기본적인 테이블 설계와 SQL 작성이 가능해요.",
              projects: [] },
            { name: "Prisma", icon: SI("prisma", "2D3748"),
              desc: "Prisma로 PostgreSQL을 연결하고 스키마를 관리했어요.",
              projects: ["Rabbit Habit"] },
            { name: "Supabase", icon: SI("supabase", "3FCF8E"),
              desc: "Supabase Storage로 이미지를 업로드·저장하고, PostgreSQL 호스팅으로 사용했어요.",
              projects: ["Rabbit Habit"] },
        ],
    },
    {
        group: "Tools & Deployment",
        items: [
            { name: "Git", icon: SI("git", "F05032"),
              desc: "브랜치를 나눠 기능 단위로 작업하고, 충돌을 해결하며 협업했어요.",
              projects: ["Peek&Pick", "Rabbit Habit", "CarTalk"] },
            { name: "GitHub", icon: SI("github", "181717"),
              desc: "PR과 코드 리뷰로 팀 프로젝트를 진행하고, GitHub Pages로 이 사이트를 배포했어요.",
              projects: ["Peek&Pick", "Rabbit Habit", "Portfolio"] },
            { name: "AWS", icon: DI("amazonwebservices/amazonwebservices-original-wordmark.svg"),
              desc: "S3 + CloudFront로 프론트엔드를, EC2 + ALB로 백엔드를 배포했어요. Route 53과 ACM으로 도메인과 HTTPS도 적용했어요.",
              projects: ["Peek&Pick"] },
            { name: "Docker", icon: SI("docker", "2496ED"),
              desc: "EC2 안에서 Nginx와 Spring Boot를 컨테이너로 구성해 운영했어요.",
              projects: ["Peek&Pick"] },
            { name: "Vercel", icon: SI("vercel", "000000"),
              desc: "Next.js 프로젝트를 배포하고 환경 변수를 구성했어요.",
              projects: ["Rabbit Habit"] },
        ],
    },
];

/* =========================
   화면 그리기
========================= */

const stackRoot = document.querySelector("#stack");
const dialog = document.querySelector("#stack-dialog");

const initialsOf = (name) =>
    name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || name.slice(0, 2);

const iconHTML = (item) =>
    item.icon
        ? `<img src="${item.icon}" alt="" data-fb="${initialsOf(item.name)}">`
        : `<span class="stack-badge">${initialsOf(item.name)}</span>`;

// 로고 이미지가 안 뜨면 이니셜 배지로 바꿔치기
const bindFallback = (root) => {
    root.querySelectorAll("img[data-fb]").forEach((img) => {
        const swap = () => {
            const badge = document.createElement("span");
            badge.className = "stack-badge";
            badge.textContent = img.dataset.fb;
            img.replaceWith(badge);
        };
        if (img.complete && img.naturalWidth === 0) swap();
        else img.addEventListener("error", swap);
    });
};

stackRoot.innerHTML = STACK.map((g, gi) => `
    <div class="stack-group">
        <h3>${g.group}</h3>
        <div class="stack-tiles">
            ${g.items.map((item, ii) => `
                <button type="button" class="stack-tile" data-g="${gi}" data-i="${ii}">
                    <span class="stack-icon">${iconHTML(item)}</span>
                    <span class="stack-name">${item.name}</span>
                </button>`).join("")}
        </div>
    </div>`).join("");

bindFallback(stackRoot);


/* =========================
   클릭하면 설명 창 열기
========================= */

stackRoot.addEventListener("click", (e) => {
    const tile = e.target.closest(".stack-tile");
    if (!tile) return;

    const item = STACK[tile.dataset.g].items[tile.dataset.i];

    const iconEl = dialog.querySelector(".sd-icon");
    iconEl.innerHTML = iconHTML(item);
    bindFallback(iconEl);
    dialog.querySelector(".sd-name").textContent = item.name;
    dialog.querySelector(".sd-desc").textContent = item.desc;

    const projectsEl = dialog.querySelector(".sd-projects");
    projectsEl.innerHTML = item.projects.length
        ? `<p>사용한 프로젝트</p><div>${item.projects.map((p) => `<span>${p}</span>`).join("")}</div>`
        : "";

    dialog.showModal();
});

// 닫기 버튼, 바깥 영역 클릭으로 닫기 (ESC는 브라우저가 자동 처리)
dialog.querySelector(".sd-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
});
