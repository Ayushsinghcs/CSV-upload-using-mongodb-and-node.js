import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscriber } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-csv",
  templateUrl: "./csv.component.html",
  styleUrls: ["./csv.component.css"]
})
export class CsvComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private flashMessagesService: FlashMessagesService
  ) {}
  selectedFiles: File = null;
  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFiles = <File>event.target.files;
    console.log(this.selectedFiles[0]);
  }
  onUpload() {
    console.log("hey");
    const formData = new FormData();
    formData.append("file", this.selectedFiles[0]);
    this.http.post("http://localhost:8080/upload", formData).subscribe(res => {
      this.flashMessagesService.show("Your File is been uploaded", {
        cssClass: "alert-success",
        timeout: 5000
      });
    });
  }
}
