function openMap() {
  window.open("https://map.kakao.com/link/map/웨딩홀,37.123456,127.123456", "_blank");
}

document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const attend = document.getElementById("attend").value;
  alert(`${name}님, 참석 여부가 '${attend === "yes" ? "참석" : "불참"}'으로 저장되었습니다. 감사합니다!`);
});