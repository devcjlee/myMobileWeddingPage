function openMap() {
  window.open("https://map.kakao.com/link/map/웨딩홀,37.123456,127.123456", "_blank");
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

// 페이지 로드 시 디데이 업데이트
updateDday();
