// 초기 데이터
let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date().getTime() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date().getTime() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date().getTime() },
];

// id 값을 증가시킬 변수
let idIndex = 3;

onload = () => {
  // 전체 출력
  initData(mockData);

  // 현재 날짜 출력
  const now = new Date();
  document.querySelector(".Header > h1").innerText = now.toDateString();
};

// 전체 출력 메서드
const initData = (printData) => {
  let str = "";

  printData.forEach((todo) => {
    str += `
        <div class="TodoItem">
            <input type="checkbox" onchange="onUpdate(${todo.id})" ${todo.isDone ? "checked" : ""}>
            <div class="content">${todo.content}</div>
            <div class="date">${new Date(todo.date).toLocaleString()}</div>
            <button onclick="todoDel(this)" name="delBtn" value="${todo.id}">삭제</button>
        </div>`;
  });
  document.querySelector(".todos_wrapper").innerHTML = str;
};

// 추가
document
  .querySelector(".Editor > button")
  .addEventListener("click", function (event) {
    // 폼 전송 기능 막기
    event.preventDefault();

    const input = document.querySelector(".Editor > input");
    const content = input.value.trim();

    // 입력이 비어있는 경우
    if (content === "") {
      return;
    }

    // 리스트에 추가
    const newTodo = {
      id: idIndex++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    mockData.push(newTodo);

    // 입력창 비우기
    input.value = "";

    // 전체 다시 출력
    initData(mockData);
  });

// 수정 (checkbox 상태 변경)
const onUpdate = (targetId) => {
  mockData = mockData.map((todo) =>
    todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
  );

  // 전체 다시 출력
  initData(mockData);
};

// 삭제
const todoDel = (th) => {
  const targetId = Number(th.value);
  mockData = mockData.filter((todo) => todo.id !== targetId);

  // 전체 다시 출력
  initData(mockData);
};

// 검색 (keyup - 키보드 키를 뗐을 때)
document.querySelector("#keyword").addEventListener("keyup", (event) => {
  let searchedTodos = getFilterData(event.target.value);

  // 검색 결과만 출력
  initData(searchedTodos);
});

const getFilterData = (search) => {
  // 검색어가 없으면 mockData를 리턴
  if (search === "") {
    return mockData;
  }

  // 대소문자 구분 없이 검색
  return mockData.filter((todo) =>
    todo.content.toLowerCase().includes(search.toLowerCase()),
  );
};
