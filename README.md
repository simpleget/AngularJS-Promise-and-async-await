Promise與Async/Await，如何等待所有異步函數結束才執行後續代碼
=
Promise and Async/Await practice (Angular 7): How to call async/await functions in series/parallel
=
## 前言：<br>
因目前公司所寫的Angular專案遇到一個狀況：所有Component、Service與Interceptor執行前，先取得一個JSON檔案，內容是關於站台使用的設定檔(Configuration)。<br>
開發平台除了localhost之外，還有兩台不同的主機，假設為domainA.com/domainB.com。<br>
Deploy是從localhost做`ng build`把dist資料夾發佈到domainA.com。<br>
domainB.com則是做`ng build --prod`<br>
以下是各位前輩嘗試解決方法的演進：

### 1. 使用import
```javascript
import local_config from './_files/config.json';
```
接著直接使用`local_cofnig`去取得內容。<br>
但在這裏遇到了一個問題，當從localhost做build後發佈到別的主機後，在domainA.com取得相當正常，但在domainB.com不知為何會一直取得domainA的檔案。<br>

以下是資深同事A對這件事情的描述：<br>
> 這在Angular CLI做build時，把import取得的路徑直接編譯成死的路徑，所以domainB.com的dist內的代碼是寫死抓取domainA的檔案。

雖然自己覺得這種邏輯很奇怪，但對於Angular CLI不太熟，也就沒繼續研究了(我不是程式端專案負責人)。
### 2. 使用HttpClient GET 相對路徑
```javascript
this.http.get('/_files/config.json').subscribe();
```
後來看同事A使用`HttpClient`相對路徑去GET，讓每台主機相對於自己的Domain去GET設定檔<br>
這樣就不會有問題吧！？
### 放屁
接著遇到異步的問題。<br>
<br>
假設變數A依賴於設定檔，在設定檔取得之前，A就被呼叫了，後面的代碼整個都錯，系統就壞了。
### 3. 使用Session Storage
此方法就不多說了，說是當作另一個備份的地方，但結果是第一次進來Session Storage也是空的時候，那問題一樣沒解決。
## 進入正題


[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-parallel-practice)
