// 🔥 Firebase SDK에서 initializeApp 함수 가져오기
// Firebase 프로젝트를 웹 앱에 연결할 수 있게 해주는 핵심 함수.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
// 📦 Firestore(데이터베이스) 관련 함수들을 가져오기
import {
  getFirestore,       // Firestore 인스턴스를 가져오는 함수
  collection,         // 특정 컬렉션(테이블과 유사)을 참조하는 함수
  addDoc,             // 컬렉션에 새 문서를 추가할 때 사용하는 함수 
  getDocs,            // 컬렉션/쿼리 결과의 모든 문서를 가져올 때 사용하는 함수
  query,              // Firestore에서 조건/정렬을 지정할 때 사용하는 함수
  orderBy,            // 쿼리 결과를 특정 필드 기준으로 정렬할 때 사용하는 함수
  serverTimestamp,    // 서버 시간을 필드 값으로 저장할 때 사용하는 함수
  deleteDoc,          // 특정 문서를 삭제할 때 사용하는 함수
  doc as firestoreDoc // 특정 문서 참조를 가져올 때 사용 (doc 이름을 firestoreDoc으로 바꿔서 사용)
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
// 🔑 Firebase Authentication(로그인/인증) 관련 함수들을 가져오기
import {
  getAuth,                     // Firebase Auth 인스턴스를 가져오는 함수
  signInWithEmailAndPassword,  // 이메일/비밀번호로 로그인할 때 사용
  onAuthStateChanged           // 로그인 상태 변화(로그인/로그아웃)를 실시간으로 감지하는 함수
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
// 🔧 Firebase 설정 및 초기화
// Firebase 콘솔에서 발급받은 프로젝트 설정값을 넣어야 함
const firebaseConfig = {
  apiKey: "AIzaSyDQSY8qBL8udXjlQDJm1khItDdjR3AQjTo",  // Firebase 프로젝트의 API 키 (앱이 Firebase와 통신할 때 사용)
  authDomain: "mymobileweddingpage.firebaseapp.com",  // Firebase Authentication에서 사용하는 도메인 주소
  projectId: "mymobileweddingpage",                   // Firebase 프로젝트 고유 ID
  storageBucket: "mymobileweddingpage.firebasestorage.app", // Firebase Storage(파일 저장소) 주소
  messagingSenderId: "195301010200",                  // Firebase Cloud Messaging(푸시 알림)에서 사용하는 발신자 ID
  appId: "1:195301010200:web:0725fb5ddd98b97400cc6d"  // Firebase 앱 고유 식별자 (웹 앱을 구분하는 ID)
};
// 🚀 Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
// 📦 Firestore 인스턴스 가져오기 (데이터베이스)
const db = getFirestore(app); 
// 🔑 Auth 인스턴스 가져오기 (로그인/인증)
const auth = getAuth(); 

// 🔐 관리자 로그인 상태 감지
let isAdmin = false; //관리자 여부. 기본값은 false(로그인 안된 상태)
onAuthStateChanged(auth, (user) => {
  // Firebase Auth에서 제공하는 함수.
  // 사용자의 로그인 상태(로그인/로그아웃)가 바뀔 때마다 자동으로 호출됨.
  // 'auth'는 getAuth(app)으로 초기화한 인증 객체.
  console.log("isAdmin 상태:", isAdmin);
  // 현재 isAdmin 값(관리자 여부)을 콘솔에 출력해서 디버깅 확인.
  console.log("로그인 상태:", user); 
  // 로그인된 사용자 정보(user 객체)를 콘솔에 출력
  // 로그인 안 되어 있으면 null이 출력됨.

  isAdmin = !!user;
  // user 객체가 존재하면 true, 없으면 false.
  // 즉 로그인 상태면 isAdmin = true, 로그아웃 상태면 isAdmin = false.

  loadGuestbook();
  // 로그인 상태가 바뀔 때마다 방명록을 다시 불러옴.
  // 관리자 여부에 따라 삭제 버튼을 보여줄지 말지 결정하기 위함.
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. 데이터 바인딩
  const introText = "저희, 결혼합니다.";
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
  const accountGuide = "참석이 어려우신 분들을 위해 계좌번호를 안내드립니다.";

  document.title = `${groomFirstName} ❤️ ${brideFirstName}의 모바일 청첩장`;

  const dataMap = {
    introText,
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
    weddingLocationContact,
    accountGuide
  };

  document.querySelectorAll("[data-name]").forEach(el => {
    const key = el.dataset.name;
    if (dataMap[key]) {
      el.textContent = dataMap[key];
    }
  });

  updateDday();
  loadGuestbook();

  // URL 쿼리로 로그인 폼 보이기
  const params = new URLSearchParams(window.location.search);
  const isAdminMode = params.get("admin") === "true";
  if (isAdminMode) {
    document.getElementById("adminLogin").style.display = "block";
  }
});

// 2. 디데이 계산
function updateDday() {
  const weddingDate = new Date("2026-04-26T11:00:00+09:00");
  const today = new Date();
  const diffTime = weddingDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const ddayText = diffDays > 0 ? `D-${diffDays}` : (diffDays === 0 ? "오늘!" : `D+${Math.abs(diffDays)}`);
  document.getElementById("dday").textContent = `(${ddayText})`;
}

// 3. 지도 열기
window.openMap = function () {
  window.open("https://map.kakao.com/link/search/밀리토피아 바이 마린 웨딩센터", "_blank");
};

// 4. 벚꽃 애니메이션
function startSakura() {
  const canvas = document.getElementById("sakuraCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const sakuraImages = [
    "images/intro/newSakuraLeaf1.png",
    "images/intro/newSakuraLeaf2.png",
    "images/intro/newSakuraLeaf3.png",
    "images/intro/newSakuraLeaf4.png",
    "images/intro/newSakuraLeaf5.png"
  ].map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const petals = [];
  for (let i = 0; i < 37; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10 + Math.random() * 10,
      speedY: 1 + Math.random() * 1.2,
      speedX: Math.random() * 0.8,
      angle: Math.random() * 2 * Math.PI,
      rotationSpeed: 0.01 + Math.random() * 0.02,
      opacity: 0,
      img: sakuraImages[Math.floor(Math.random() * sakuraImages.length)]
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);

    // 앞뒤로 뒤집히는 효과 (sin 값으로 scaleX 조정)
    const flipX = Math.sin(Date.now() / 300 + p.x * 0.01);
    ctx.scale(flipX, 1); // flipX가 -1 ~ 1 사이로 변하면서 좌우 반전


    ctx.rotate(p.angle);
    ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.angle += p.rotationSpeed + Math.sin(Date.now() / 1000 + p.x) * 0.005;
      p.opacity += 0.01;
      if (p.opacity > 1) p.opacity = 1;
      if (p.y > canvas.height) p.y = -20;
      if (p.x > canvas.width) p.x = -20;
      drawPetal(p);
    });
    requestAnimationFrame(animate);
  }
  let loadedCount = 0;
  sakuraImages.forEach(img => {
    img.onload = () => {
      loadedCount++;
      if (loadedCount === sakuraImages.length) {
        requestAnimationFrame(animate);
        // 인트로 메시지 애니메이션도 동시에 시작
        document.getElementById("introText").classList.add("show");
      }
    };
  });
}

window.addEventListener("load", () => {
  startSakura();
  const overlay = document.getElementById("introOverlay");
  setTimeout(() => {
    overlay.classList.add("fade-out");
  }, 3800);
});

// 5. 방명록 기능
document.getElementById("guestbookForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value;
  const message = document.getElementById("guestMessage").value;

  await addDoc(collection(db, "guestbook"), {
    name,
    message,
    timestamp: serverTimestamp()
  });

  this.reset();
  loadGuestbook();
});

async function loadGuestbook() {
  const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  console.log("문서 수:", snapshot.size);
  const list = document.getElementById("guestbookList");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    console.log("문서 내용:", doc.data());
    const entry = doc.data();
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.message}`;

    // 관리자일 때만 삭제 버튼 추가
    if (isAdmin && window.location.search.includes("admin=true")) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "삭제";
      delBtn.className = "delete-btn";
      delBtn.onclick = () => deleteGuestbookEntry(doc.id);
      li.appendChild(delBtn);
    }
    list.appendChild(li);
  });
}

window.copyAccount = function (button){
  const input = button.previousElementSibling;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(input.value)
      .then(() => {
        button.textContent = "복사됨!";
        setTimeout(() => {
          button.textContent = "복사";
        }, 1500);
      })
      .catch(err => {
        console.error("복사 실패:", err);
        alert("복사에 실패했어요. 브라우저 설정을 확인해주세요.");
      });
  } else {
    alert("이 브라우저에서는 복사 기능을 지원하지 않아요.");
  }
}

window.loginAdmin = function () {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("로그인 성공!");
    })
    .catch((error) => {
      alert("로그인 실패: " + error.message);
    });
};

window.logoutAdmin = function () {
  auth.signOut()
    .then(() => {
      alert("로그아웃 성공!");
      isAdmin = false;
      loadGuestbook(); // 삭제 버튼 숨기기 위해 다시 로드
    })
    .catch((error) => {
      alert("로그아웃 실패: " + error.message);
    });
};

// 🗑️ 방명록 삭제 함수
async function deleteGuestbookEntry(id) {
  const confirmDelete = confirm("정말로 삭제하시겠어요?");
  if (!confirmDelete) return;
  try {
    await deleteDoc(firestoreDoc(db, "guestbook", id));
    alert("삭제되었습니다.");
    loadGuestbook();
  } catch (err) {
    console.error("삭제 실패:", err);
    alert("삭제에 실패했어요.");
  }
}