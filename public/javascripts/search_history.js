// 검색버튼 눌렀을 때 호출되는 함수
function search_history() {
  const search_term = document.getElementById("search_search").value; //input tag id
  if (search_term !== '') {
    let history_list = get_history();
    if(history_list !== null){
      history_list[history_list.length] = search_term;
    }else {
      history_list = [search_term];
    }
    localStorage.setItem('search_history', JSON.stringify(history_list));
  }
}

// nav-bar 홈 버튼 눌렀을 때 호출되는 함수
function show_history() {
  if(localStorage.getItem('search_history') !== null && document.getElementById('history_place') !== null ) {//return value 확인
    const history_list = get_history();
    history_process(history_list);
  }
}

// 중복되는 for 문
function history_process(history_list){
  const five_items = history_list.slice(-5);
  let history_banner = '';
  for (let i = five_items.length-1; i >= 0; i--){
    if(five_items[i] !== ''){

      history_banner += '<li class="list-group-item" ><div id="history_name"><a href="/search?keyword='+ five_items[i] +'">' + five_items[i] + '</a></div> \
      <div id="history_delete_btn" onclick="delete_select_history('+i+');">&times;</div></li>';

/*
      history_banner += '<li class="list-group-item" ><div id="history_name"><a href="/search?keyword='+ five_items[i] +'">' + five_items[i] + '</a> \
      <button class="btn" id= "history_delete_btn" onclick = "delete_select_history('+i+');">삭제</button></div></li>';
*/  
    }
    console.log(i);
  }
  document.getElementById('history_place').innerHTML = history_banner;
}

// 히스토리 지우기
function delete_select_history(i){
  var rmv_this = i; 
  myHistoryList = get_history()
  console.log(myHistoryList);
  myHistoryList.splice(i, 1);
  console.log(myHistoryList);
  localStorage.setItem('search_history', JSON.stringify(myHistoryList));
  window.location.reload(true);

  //  var index = myFavoriteList.indexOf(rmv_this);
  //       if (index > -1) {
  //         myFavoriteList.splice(index, 1);
  //         set_item(myFavoriteList);
  //         window.location.reload(true);
  // }  
}

function delete_history(){
  localStorage.removeItem('search_history');
  window.location.reload(true);  
}

function get_history(){
  return JSON.parse(localStorage.getItem('search_history'));
}

//이벤트 처리
$(function () {
  $("#go_to_home_nav").on("click", show_history());
});