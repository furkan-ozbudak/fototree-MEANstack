import { Component, HostListener, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  private file: File | null = null;
  onChange: Function;

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = "";
    this.file = null;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  @HostListener("change", ["$event.target.files"]) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}
}
