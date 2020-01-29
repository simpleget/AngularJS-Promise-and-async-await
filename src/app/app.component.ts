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
export class AppComponent implements OnInit {
  name = "Angular";
  apiUrl = "https://www.techiediaries.com/api/data.json";

  constructor(private httpClient: HttpClient) {
    this.inParallel().then(() => {
      console.log("### all Done");
    });
  }

  ngOnInit() {}

  private fetchData() {
    const data = this.httpClient.get(this.apiUrl).toPromise();
    console.log("Data1: done get promise");
    return data;
  }

  private fetchData2() {
    const data = this.httpClient.get(this.apiUrl).toPromise();
    console.log("Data2: done get promise");
    return data;
  }

  async inParallel() {
    const promise1 = this.fetchData();
    const promise2 = this.fetchData2();
    console.log(await promise1);
    console.log(await promise2);
    return new Promise(r => setTimeout(r, 0));
  }

  printNumber1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Number1 is done");
        resolve(10);
      }, 1000);
    });
  }

  printNumber2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Number2 is done");
        resolve(20);
      }, 5000);
    });
  }
}
