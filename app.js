const routeOptions = [...document.querySelectorAll('.route-option')];
const etaTime = document.querySelector('#etaTime');
const memberEta = document.querySelector('#memberEta');
const reason = document.querySelector('#reason');
const charCount = document.querySelector('#charCount');
const toast = document.querySelector('#toast');
const toastText = document.querySelector('#toastText');
let toastTimer;

function showToast(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2700);
}

routeOptions.forEach((option) => option.addEventListener('click', () => {
  routeOptions.forEach((item) => {
    const active = item === option;
    item.classList.toggle('selected', active);
    item.setAttribute('aria-checked', String(active));
  });
  etaTime.innerHTML = `${option.dataset.eta} <em>(${option.dataset.time}분 지연)</em>`;
  memberEta.textContent = option.dataset.eta;
  document.querySelector('.route-footnote .updated').textContent = '방금 계산';
}));

document.querySelector('#startRoute').addEventListener('click', () => showToast('선택한 경로 안내를 시작했어요.'));
document.querySelector('#refreshBtn').addEventListener('click', (event) => {
  event.currentTarget.classList.add('spinning');
  setTimeout(() => event.currentTarget.classList.remove('spinning'), 650);
  showToast('실시간 교통 정보를 업데이트했어요.');
});

document.querySelectorAll('.chip').forEach((chip) => chip.addEventListener('click', () => {
  document.querySelectorAll('.chip').forEach((item) => item.classList.toggle('active', item === chip));
  reason.value = chip.dataset.reason;
  charCount.textContent = `${reason.value.length}/50`;
}));
reason.addEventListener('input', () => { charCount.textContent = `${reason.value.length}/50`; });

document.querySelector('#shareBtn').addEventListener('click', () => {
  const note = reason.value.trim();
  if (!note) { reason.focus(); document.querySelector('#shareNote').textContent = '지연 사유를 입력하거나 아래 빠른 선택지를 골라주세요.'; return; }
  document.querySelector('.sharing-status').innerHTML = '<i></i> 공유 완료';
  document.querySelector('.sharing-status i').style.background = '#35c875';
  document.querySelector('.member-name>small').innerHTML = '<i class="on-time-dot"></i> 팀에 지연 상황 공유됨';
  document.querySelector('#shareNote').textContent = '팀장에게 도착 시간과 지연 사유를 전달했어요.';
  showToast('팀에 도착 예정 시간과 상황을 공유했어요.');
});
document.querySelector('#skipBtn').addEventListener('click', () => showToast('이번에는 공유를 건너뛰었어요.'));

document.querySelectorAll('.time-option').forEach((option) => option.addEventListener('click', () => {
  document.querySelectorAll('.time-option').forEach((item) => {
    const active = item === option;
    item.classList.toggle('selected', active);
    item.setAttribute('aria-checked', String(active));
  });
}));
document.querySelector('#confirmTime').addEventListener('click', () => {
  const selected = document.querySelector('.time-option.selected b').textContent;
  showToast(`${selected} 모임 시간으로 팀에 제안했어요.`);
});

const fallbackPanel = document.querySelector('#fallbackPanel');
document.querySelector('#noOverlapToggle').addEventListener('click', (event) => {
  fallbackPanel.hidden = !fallbackPanel.hidden;
  event.currentTarget.querySelector('span').textContent = fallbackPanel.hidden ? '⌄' : '⌃';
});
document.querySelector('#videoBtn').addEventListener('click', () => {
  document.querySelector('#meetingLinkWrap').hidden = false;
  document.querySelector('#meetingLink').focus();
  showToast('화상 회의 링크를 입력해 팀에 공유해 주세요.');
});
document.querySelector('#dateBtn').addEventListener('click', () => {
  const date = document.querySelector('#newDate').value;
  if (!date) { document.querySelector('#newDate').focus(); showToast('변경할 모임 날짜를 먼저 선택해 주세요.'); return; }
  showToast(`${date.replaceAll('-', '. ')} 모임 날짜 변경안을 준비했어요.`);
});
