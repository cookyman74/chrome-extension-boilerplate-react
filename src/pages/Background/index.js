console.log('This is the background page.');
console.log('Put the background scripts here.');

var app = {};
app.data = {};
app.tabStorage2 = async () => {
  var winId = 0;
  await chrome.windows.getCurrent({ populate: true }).then((windowInfo) => {
    winId = windowInfo.id;
  });

  await chrome.storage.local.set({ winId: winId }, () => {
    console.log('쿠키맨1111: ', chrome.storage.local.get(['winId']));
  });
};


app.tabs = async (type = 'newTab') => {
  var winId = 0;
  await chrome.windows.getCurrent({ populate: true }).then((windowInfo) => {
    winId = windowInfo.id;
  });

  chrome.tabs.query({title: "newTab"}, (tabs) => {
    app.data.winId = winId;
    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, app.data);
    }
  });
};

chrome.tabs.onCreated.addListener(() => {
  console.log('탭이 생성되는 경우1');
  // 모든 탭 리스트를 갱신
  // var winId = chrome.windows.WINDOW_ID_CURRENT;
  // chrome.tabs.query({ windowId: winId }, async (tabs) => {
  //   await chrome.storage.local.set({ [winId]: tabs }, () => {
  //     console.log('데이터저장: ', tabs);
  //   });
  // });
  app.tabs('newtab');
});

chrome.tabs.onActivated.addListener((e) => {
  console.log('탭 활성화되는 경우2');
  // 1. 탭활성화된 정보를 chrome.storage에 저장.
  // 2. storage가 변경되면, vuex에 저장.
  app.tabs('active');
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
  console.log('탭을 다른 윈도우로 변경하는 경우3');
  // 만약 윈도우id가 다를 경우,
  // vuex에 상태 변경
});

chrome.tabs.onRemoved.addListener(function () {
  console.log('리스트 항목 삭제의 경우4');
  // 리스트중 id값이 hdfIsRemovedInUI가 false인경우 리스트 업데이트
  // 그외에는 isRemovedInUI.value에 false 값 저장
});

chrome.tabs.onMoved.addListener(function () {
  console.log('리스트 항목 이동의 경우5');
  //리스트의 id값이 isMovedInUI의 값이 false이면..업데이트
  //그외에는 false으로 저장.
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('탭정보가 업데이트 되는 경우.6');
  // 상세한 연구필요.
  app.tabs('newtab');
});