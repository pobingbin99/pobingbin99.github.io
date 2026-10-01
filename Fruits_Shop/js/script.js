// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
    container.innerHTML = "";
    data.forEach((item) => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
                    <img src="${item.img}" class="card-img-top" alt="${item.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
                    </div>
                </a>
            </div>
        </div>`;
    });
}

// 과일 출력 메서드 (검색 + 정렬)
function filterAndSortFruits() {
  const keyword = searchBox.value.trim();
  const sortType = sortSelect.value;

  // 검색
  let result = fruits.filter((item) => item.name.includes(keyword));

  // 정렬
  if (sortType === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortType === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  // 화면에 다시 출력
  renderProducts(result, fruitList);
}

// 채소 출력 메서드 (3개씩 증가)
function loadVeggies() {
  // 더 보여줄 채소가 없으면 버튼 비활성화
  if (veggiePage * 3 >= veggies.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "마지막 상품입니다";
    alert("마지막 상품입니다.");
  }

  // 보여줄 상품이 남아있는 경우
  veggiePage++;

  const shown = veggies.slice(0, veggiePage * 3);

  // 화면에 다시 출력
  renderProducts(shown, veggieList);
}

// 이벤트 리스너(input - input의 값이 변경됐을 때)
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();