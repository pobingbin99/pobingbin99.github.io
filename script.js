// =========================================================
// 이은진 포트폴리오 — script.js
// 기술 스택 데이터를 고치려면 아래 SKILLS 배열만 수정하면 돼요.
// =========================================================

// 프로젝트 이름 → 페이지 안 섹션 id (링크로 이동)
const PROJECT_LINKS = {
  "Rabbit Habit": "#rabbit-habit",
  "Peek&Pick": "#peek-pick",
  "CarTalk": "#cartalk",
  "Gotcha-Fish": "#gotcha-fish",
};

// 카테고리별 강조 색 (style.css 의 변수와 같은 값)
const CATEGORIES = [
  { name: "Frontend", color: "var(--lilac)" },
  { name: "Backend", color: "var(--mint)" },
  { name: "Database", color: "var(--sky)" },
  { name: "Tools & Deployment", color: "var(--pink)" },
];

const SKILLS = [
  { cat: "Frontend", name: "React", projects: ["Peek&Pick", "CarTalk"], desc: [
    "리뷰 작성·조회·수정 화면을 직접 구현했어요.",
    "React Query로 서버 상태를 관리하고, 무한 스크롤을 구현했어요.",
    "커스텀 훅으로 기능을 분리해 코드의 재사용성도 높였어요.",
  ]},
  { cat: "Frontend", name: "Next.js", projects: ["Rabbit Habit"], desc: [
    "App Router 기반으로 페이지와 레이아웃을 구성했어요.",
    "Server Actions과 NextAuth.js를 활용해 기능을 구현했어요.",
    "Prisma ORM을 활용해 DB와 연동하고 데이터를 조회·관리했어요.",
  ]},
  { cat: "Frontend", name: "TypeScript", projects: ["Peek&Pick", "Rabbit Habit", "CarTalk"], desc: [
    "프론트엔드 프로젝트를 모두 TypeScript로 진행했어요.",
    "API 응답과 컴포넌트 Props에 타입을 정의해 사용해요.",
  ]},
  { cat: "Frontend", name: "JavaScript", projects: ["Portfolio"], desc: [
    "프레임워크 없이 DOM 조작과 이벤트 처리로 화면을 만들 수 있어요.",
    "이 포트폴리오 사이트도 바닐라 JavaScript로 만들었어요.",
  ]},
  { cat: "Frontend", name: "Tailwind CSS", projects: ["Peek&Pick", "Rabbit Habit", "CarTalk"], desc: [
    "유틸리티 클래스를 활용해 반응형 화면을 구성할 수 있어요.",
    "프로젝트의 UI를 Tailwind CSS로 구현해 봤어요.",
  ]},

  { cat: "Backend", name: "Java", projects: ["Gotcha-Fish", "Peek&Pick"], desc: [
    "객체지향 설계를 바탕으로 기능을 나눠 구현할 수 있어요.",
    "Socket과 Thread를 활용해 실시간 1:1 대결 기능을 구현해 봤어요.",
  ]},
  { cat: "Backend", name: "Spring Boot", projects: ["Peek&Pick"], desc: [
    "Controller, Service, Repository 계층을 나눠 역할에 맞게 구현할 수 있어요.",
    "리뷰 CRUD와 다중 이미지 업로드(multipart) 기능을 구현했어요.",
    "JPA를 활용해 엔티티 연관관계를 설계하고 DB와 연동했어요.",
    "QueryDSL을 활용해 리뷰 조회 동적 쿼리를 작성했어요.",
  ]},

  { cat: "Database", name: "PostgreSQL", projects: ["Peek&Pick", "Rabbit Habit"], desc: [
    "기본적인 테이블과 관계를 설계하고 SQL을 작성할 수 있어요.",
    "서비스 DB로 활용했으며, 벡터 DB 용도로도 사용해 봤어요.",
  ]},
  { cat: "Database", name: "MySQL", projects: ["Gotcha-Fish"], desc: [
    "테이블과 관계를 설계하고 기본적인 SQL을 작성할 수 있어요.",
  ]},
  { cat: "Database", name: "Supabase", projects: ["Rabbit Habit"], desc: [
    "Supabase Storage를 활용해 이미지를 업로드·저장했어요.",
    "PostgreSQL 데이터베이스를 서비스 DB로 사용했어요.",
  ]},

  { cat: "Tools & Deployment", name: "Git", projects: ["Peek&Pick", "Rabbit Habit", "CarTalk"], desc: [
    "브랜치를 나눠 기능 단위로 작업하고, 충돌을 해결하며 협업했어요.",
  ]},
  { cat: "Tools & Deployment", name: "GitHub", projects: ["Peek&Pick", "Rabbit Habit", "Portfolio"], desc: [
    "PR과 코드 리뷰를 활용해 팀 프로젝트를 진행했어요.",
    "GitHub Pages를 활용해 포트폴리오 사이트를 배포했어요.",
  ]},
  { cat: "Tools & Deployment", name: "AWS", projects: ["Peek&Pick"], desc: [
    "S3와 CloudFront를 활용해 프론트엔드를 배포했어요.",
    "EC2와 ALB를 활용해 백엔드를 배포했어요.",
    "Route 53과 ACM을 활용해 도메인과 HTTPS를 적용했어요.",
  ]},
  { cat: "Tools & Deployment", name: "Docker", projects: ["Peek&Pick"], desc: [
    "EC2 환경에서 Nginx와 Spring Boot를 컨테이너로 구성해 운영했어요.",
  ]},
  { cat: "Tools & Deployment", name: "Vercel", projects: ["Rabbit Habit"], desc: [
    "Next.js 프로젝트를 배포하고 환경 변수를 구성했어요.",
  ]},
];

const groupsEl = document.getElementById("skillGroups");
const detailEl = document.getElementById("skillDetail");

function colorOf(cat) {
  return CATEGORIES.find((c) => c.name === cat).color;
}

// 1) 카테고리별 버튼 만들기
CATEGORIES.forEach((category) => {
  const group = document.createElement("div");
  group.className = "skill-group";

  const title = document.createElement("h3");
  title.textContent = category.name;
  group.appendChild(title);

  const row = document.createElement("div");
  SKILLS.filter((s) => s.cat === category.name).forEach((skill) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "skill-btn";
    btn.textContent = skill.name;
    btn.style.setProperty("--cat", category.color);
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => showSkill(skill, btn));
    row.appendChild(btn);
  });
  group.appendChild(row);
  groupsEl.appendChild(group);
});

// 2) 선택한 기술 상세 보여주기
function showSkill(skill, btn) {
  groupsEl.querySelectorAll(".skill-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
  btn.setAttribute("aria-pressed", "true");

  detailEl.style.setProperty("--cat", colorOf(skill.cat));

  const used = skill.projects
    .map((p) => (PROJECT_LINKS[p] ? `<a href="${PROJECT_LINKS[p]}">${p}</a>` : `<em>${p}</em>`))
    .join("");

  detailEl.innerHTML = `
    <h3>${skill.name}</h3>
    <ul class="desc">${skill.desc.map((d) => `<li>${d}</li>`).join("")}</ul>
    <p class="used"><span>사용 프로젝트</span>${used}</p>
  `;
}

// 처음에는 React를 선택한 상태로 시작
const firstBtn = groupsEl.querySelector(".skill-btn");
if (firstBtn) showSkill(SKILLS[0], firstBtn);

// 메인 멘트의 바뀌는 단어
const ROTATE_WORDS = ["고민하고", "설계하고", "개선하고"];
const rotatorWord = document.getElementById("rotatorWord");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let wordIndex = 0;

setInterval(() => {
  wordIndex = (wordIndex + 1) % ROTATE_WORDS.length;
  if (reduceMotion) {
    rotatorWord.textContent = ROTATE_WORDS[wordIndex];
    return;
  }
  rotatorWord.className = "rotator-word out";
  setTimeout(() => {
    rotatorWord.textContent = ROTATE_WORDS[wordIndex];
    rotatorWord.className = "rotator-word in";
  }, 350);
}, 2200);

// 처음 들어왔을 때 "이은진"에 빛이 한 번 지나가게
const crystal = document.querySelector(".crystal");
if (crystal && !reduceMotion) {
  const text = crystal.querySelector(".crystal-text");
  setTimeout(() => {
    text.classList.add("shine");
    setTimeout(() => text.classList.remove("shine"), 1100);
  }, 900);
}

// 푸터 연도
document.getElementById("year").textContent = new Date().getFullYear();
