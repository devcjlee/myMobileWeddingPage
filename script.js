document.addEventListener ("DOMContentLoaded", () => {
  // 1. 변수 선언
  const welcomeMessage = "저희 두 사람의 소중한 날에 함께해 주세요.";
  const groomFullName = "고길동";
  const brideFullName = "둘리맘";
  const groomFirstName = groomFullName.slice(1);
  const brideFirstName = brideFullName.slice(1);
  const groomFatherFullName = "고아빠";
  const groomMotherFullName = "고엄마";
  const brideFatherFullName = "둘아빠";
  const brideMotherFullName = "둘엄마";
  const weddingYear = "2026";
  const weddingMonth = "04";
  const weddingDay = "26";
  const weddingDayOfWeek = "일";
  const weddingHour = "오전 11";
  const weddingLocation = "밀리토피아 바이 마린 웨딩센터 2층 아이리스홀";
  const weddingLocationAddress1 = "경기 성남시 수정구 위례대로 83 밀리토피아호텔 바이마린 웨딩센터";
  const weddingLocationAddress2 = "경기 성남시 수정구 창곡동 566";
  const weddingLocationContact = "031-727-9350";

  // 2. title 업데이트
  document.title = `${groomFirstName} ❤️ ${brideFirstName}의 모바일 청첩장`;

  const dataMap = {
    welcomeMessage,
    groomFullName,
    brideFullName,
    groomFirstName,
    brideFirstName,
    groomFatherFullName,
    groomMotherFullName,
    brideFatherFullName,
    brideMotherFullName,
    weddingYear,
    weddingMonth,
    weddingDay,
    weddingDayOfWeek,
    weddingHour,
    weddingLocation,
    weddingLocationAddress1,
    weddingLocationAddress2,
    weddingLocationContact
  };

  document.querySelectorAll("[data-name]").forEach(el => {
    const key = el.dataset.name;
    if (dataMap[key]) {
      el.textContent = dataMap[key];
    }
  });

  updateDday();
});


// 지도 열기
function openMap() {
  window.open("https://map.kakao.com/link/search/밀리토피아 바이 마린 웨딩센터", "_blank");
}

// 디데이 계산
function updateDday() {
  const weddingDate = new Date("2026-04-26T11:00:00+09:00"); // 결혼식 날짜
  const today = new Date();
  
  // 시간 차이 계산 (밀리초 → 일수)
  const diffTime = weddingDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const ddayText = diffDays > 0 ? `D-${diffDays}` : (diffDays === 0 ? "오늘!" : `D+${Math.abs(diffDays)}`);
  document.getElementById("dday").textContent = `(${ddayText})`;
}

// 인트로 오버레이 페이드아웃
window.addEventListener("load", () => {
  const overlay = document.getElementById("introOverlay");
  setTimeout(() => {
    overlay.classList.add("fade-out");
  }, 2000); // 2초 후 페이드아웃
});

// 벚꽃 애니메이션
function startSakura() {
  const canvas = document.getElementById("sakuraCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const sakuraImg1 = new Image();
  sakuraImg1.src = "images/sakuraLeaf1.png"; // 벚꽃 이미지 경로

  const petals = [];

  for (let i = 0; i < 24; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10 + Math.random() * 10,
      speedY: 1 + Math.random() * 1.2,
      speedX: Math.random() * 0.6,
      angle: Math.random() * 2 * Math.PI,
      rotationSpeed: 0.01 + Math.random() * 0.02,
      opacity: 0 // 처음엔 완전 투명
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity; // 투명도 적용
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.drawImage(sakuraImg1, -p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.angle += p.rotationSpeed;
      p.opacity += 0.03; // 서서히 선명해지게
      if (p.opacity > 1) p.opacity = 1;
      if (p.y > canvas.height) p.y = -20;
      if (p.x > canvas.width) p.x = -20;

      drawPetal(p);
    });
    requestAnimationFrame(animate);
  }

  sakuraImg1.onload = () => {
    requestAnimationFrame(animate);
  };
}

// 인트로 오버레이 페이드아웃 + 벚꽃 시작
window.addEventListener("load", () => {
  startSakura(); // 벚꽃 애니메이션 시작
  const overlay = document.getElementById("introOverlay");
  setTimeout(() => {
    overlay.classList.add("fade-out");
  }, 2000);
});