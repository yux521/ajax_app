function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      // 200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200){
        alert('Error ${XHR.status}: ${XHR.statusText}');
        return null;
      }
      // itemは、レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // formTextを取得する理由は、この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、メモの入力フォームをリセットする必要があるので、リセット対象の要素であるcontentという要素を取得。
      const formText = document.getElementById("content");
      // 下記は「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時:${item.created_at}
        </div>
        <div class="post-content">
          ${item.content}
        </div>`;
        // listという要素に対して、insertAdjacentHTMLでHTMLを追加。
        // 第一引数にafterendを指定することで、要素listの直後に挿入できる。
      list.insertAdjacentHTML("afterend" , HTML);
      // 「メモの入力フォームに入力されたままの文字」はリセットされる。（正確には、空の文字列に上書きされるような仕組み）
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);