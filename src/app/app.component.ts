import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * This example is from StackOverflow:
 * https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
 */

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  apiUrl = "https://www.techiediaries.com/api/data.json";

  constructor(private httpClient: HttpClient) {
  this.parallel().then(() => {
    console.log("### parallel DONE ###", this.getExecTime());
  });
  }

  getExecTime() {
    return (
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds() +
      "." +
      new Date().getMilliseconds()
    );
  }

    private foo1() {
    console.log("### in foo1 ###", this.getExecTime());
    return new Promise(resolve => {
      this.httpClient
        .get(this.apiUrl)
        .toPromise()
        .then(d => {
          setTimeout(() => {
            console.log("### httpClient get foo1 done", this.getExecTime());
            resolve();
          }, 5000); // 5 sec
        });
    });
  }

  private foo2() {
    console.log("### in foo2 ###", this.getExecTime());
    return new Promise(resolve => {
      this.httpClient
        .get(this.apiUrl)
        .toPromise()
        .then(d => {
          setTimeout(() => {
            console.log("### httpClient get foo2 done", this.getExecTime());
            resolve();
          }, 1000); // 1 sec
        });
    });
  }

 async parallel() {
    const promise1 = this.foo1();
    const promise2 = this.foo2();
    await promise1;
    await promise2;
    return new Promise(r => r());
  }
}
